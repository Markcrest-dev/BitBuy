import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Get user's loyalty account
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        loyaltyAccount: {
          include: {
            transactions: {
              orderBy: { createdAt: 'desc' },
              take: 20,
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create loyalty account if it doesn't exist
    if (!user.loyaltyAccount) {
      const newAccount = await prisma.loyaltyAccount.create({
        data: {
          userId: user.id,
          points: 0,
          totalEarned: 0,
          totalRedeemed: 0,
          tier: 'BRONZE',
        },
        include: {
          transactions: true,
        },
      });

      return NextResponse.json(newAccount);
    }

    return NextResponse.json(user.loyaltyAccount);
  } catch (error) {
    console.error('Error fetching loyalty account:', error);
    return NextResponse.json(
      { error: 'Failed to fetch loyalty account' },
      { status: 500 }
    );
  }
}

// Redeem points
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { points, description } = await req.json();

    if (!points || points <= 0) {
      return NextResponse.json({ error: 'Invalid points amount' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { loyaltyAccount: true },
    });

    if (!user || !user.loyaltyAccount) {
      return NextResponse.json({ error: 'Loyalty account not found' }, { status: 404 });
    }

    if (user.loyaltyAccount.points < points) {
      return NextResponse.json({ error: 'Insufficient points' }, { status: 400 });
    }

    // Update loyalty account and create transaction
    const [updatedAccount] = await prisma.$transaction([
      prisma.loyaltyAccount.update({
        where: { id: user.loyaltyAccount.id },
        data: {
          points: { decrement: points },
          totalRedeemed: { increment: points },
        },
      }),
      prisma.loyaltyTransaction.create({
        data: {
          userId: user.id,
          accountId: user.loyaltyAccount.id,
          type: 'REDEEMED',
          points: -points,
          description: description || 'Points redeemed',
        },
      }),
    ]);

    return NextResponse.json(updatedAccount);
  } catch (error) {
    console.error('Error redeeming points:', error);
    return NextResponse.json(
      { error: 'Failed to redeem points' },
      { status: 500 }
    );
  }
}
