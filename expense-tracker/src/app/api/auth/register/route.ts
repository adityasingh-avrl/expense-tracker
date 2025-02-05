import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Validate that request has a body
    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName } = body;

    // Validate required fields
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: "Valid password is required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user with default categories and preferences
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        firstName: firstName || null,
        lastName: lastName || null,
        categories: {
          create: [
            { name: 'Food & Dining', color: '#FF5733', icon: '🍽️' },
            { name: 'Transportation', color: '#33FF57', icon: '🚗' },
            { name: 'Housing', color: '#3357FF', icon: '🏠' },
            { name: 'Utilities', color: '#FF33F5', icon: '💡' },
            { name: 'Entertainment', color: '#33FFF5', icon: '🎬' },
            { name: 'Shopping', color: '#F5FF33', icon: '🛍️' },
            { name: 'Healthcare', color: '#FF3333', icon: '🏥' },
            { name: 'Education', color: '#33FF33', icon: '📚' },
            { name: 'Personal Care', color: '#3333FF', icon: '💅' },
            { name: 'Income', color: '#33FF57', icon: '💰' },
          ],
        },
        preferences: {
          create: {
            currency: 'USD',
            theme: 'light',
            language: 'en',
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      userId: user.id,
    });

  } catch (error) {
    console.error("Registration error:", error);
    
    // Return a more specific error message if possible
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
} 