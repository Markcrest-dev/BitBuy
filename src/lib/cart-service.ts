import { prisma } from './prisma'

export interface CartItemData {
  productId: string
  quantity: number
  price: number
}

export interface LocalCartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

/**
 * Get or create user's cart
 */
export async function getOrCreateCart(userId: string) {
  try {
    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })
    }

    return cart
  } catch (error) {
    console.error('Error getting or creating cart:', error)
    throw new Error('Failed to get cart')
  }
}

/**
 * Get user's cart
 */
export async function getUserCart(userId: string) {
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                images: true,
                inventory: true,
                active: true,
              },
            },
          },
        },
      },
    })

    return cart
  } catch (error) {
    console.error('Error fetching cart:', error)
    throw new Error('Failed to fetch cart')
  }
}

/**
 * Add item to cart or update quantity if already exists
 */
export async function addToCart(
  userId: string,
  productId: string,
  quantity: number,
  price: number
) {
  try {
    const cart = await getOrCreateCart(userId)

    // Check if product exists and is active
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      throw new Error('Product not found')
    }

    if (!product.active) {
      throw new Error('Product is not available')
    }

    if (product.inventory < quantity) {
      throw new Error('Insufficient inventory')
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    })

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity

      if (product.inventory < newQuantity) {
        throw new Error('Insufficient inventory')
      }

      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: newQuantity,
          price, // Update price in case it changed
        },
        include: {
          product: true,
        },
      })

      return updatedItem
    } else {
      // Create new cart item
      const newItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          price,
        },
        include: {
          product: true,
        },
      })

      return newItem
    }
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItemQuantity(
  userId: string,
  cartItemId: string,
  quantity: number
) {
  try {
    // Verify cart belongs to user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        cart: true,
        product: true,
      },
    })

    if (!cartItem) {
      throw new Error('Cart item not found')
    }

    if (cartItem.cart.userId !== userId) {
      throw new Error('Unauthorized')
    }

    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0')
    }

    if (cartItem.product.inventory < quantity) {
      throw new Error('Insufficient inventory')
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: {
        product: true,
      },
    })

    return updatedItem
  } catch (error) {
    console.error('Error updating cart item:', error)
    throw error
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(userId: string, cartItemId: string) {
  try {
    // Verify cart belongs to user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        cart: true,
      },
    })

    if (!cartItem) {
      throw new Error('Cart item not found')
    }

    if (cartItem.cart.userId !== userId) {
      throw new Error('Unauthorized')
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    })

    return { success: true }
  } catch (error) {
    console.error('Error removing from cart:', error)
    throw error
  }
}

/**
 * Clear user's cart
 */
export async function clearCart(userId: string) {
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId },
    })

    if (!cart) {
      return { success: true }
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })

    return { success: true }
  } catch (error) {
    console.error('Error clearing cart:', error)
    throw new Error('Failed to clear cart')
  }
}

/**
 * Sync local storage cart to database
 * Merges guest cart with authenticated user cart
 */
export async function syncCart(userId: string, localCartItems: LocalCartItem[]) {
  try {
    const cart = await getOrCreateCart(userId)

    if (!localCartItems || localCartItems.length === 0) {
      return cart
    }

    // Get current cart items
    const existingItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
    })

    // Process each local cart item
    for (const localItem of localCartItems) {
      // Verify product exists and get latest price
      const product = await prisma.product.findUnique({
        where: { id: localItem.id },
      })

      if (!product || !product.active) {
        console.warn(`Product ${localItem.id} not found or inactive, skipping`)
        continue
      }

      // Check if item exists in database cart
      const existingItem = existingItems.find(
        (item) => item.productId === localItem.id
      )

      if (existingItem) {
        // Merge quantities (take the maximum)
        const newQuantity = Math.max(existingItem.quantity, localItem.quantity)

        // Check inventory
        const finalQuantity = Math.min(newQuantity, product.inventory)

        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: finalQuantity,
            price: product.price, // Use latest price
          },
        })
      } else {
        // Add new item from local cart
        const quantity = Math.min(localItem.quantity, product.inventory)

        if (quantity > 0) {
          await prisma.cartItem.create({
            data: {
              cartId: cart.id,
              productId: localItem.id,
              quantity,
              price: product.price, // Use latest price
            },
          })
        }
      }
    }

    // Return updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    return updatedCart
  } catch (error) {
    console.error('Error syncing cart:', error)
    throw new Error('Failed to sync cart')
  }
}

/**
 * Validate cart items (check inventory and active status)
 */
export async function validateCart(userId: string) {
  try {
    const cart = await getUserCart(userId)

    if (!cart) {
      return { valid: true, issues: [] }
    }

    const issues: Array<{
      itemId: string
      productId: string
      productName: string
      issue: string
    }> = []

    for (const item of cart.items) {
      if (!item.product.active) {
        issues.push({
          itemId: item.id,
          productId: item.product.id,
          productName: item.product.name,
          issue: 'Product is no longer available',
        })
      } else if (item.product.inventory < item.quantity) {
        issues.push({
          itemId: item.id,
          productId: item.product.id,
          productName: item.product.name,
          issue: `Only ${item.product.inventory} items available`,
        })
      }
    }

    return {
      valid: issues.length === 0,
      issues,
    }
  } catch (error) {
    console.error('Error validating cart:', error)
    throw new Error('Failed to validate cart')
  }
}
