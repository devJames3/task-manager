import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//GET all tasks
export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

//POST a new task
export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();
    const newTask = await prisma.task.create({
      data: {title, description },
    });
    return NextResponse.json(newTask, { status: 201});
  }catch (error) {
    return NextResponse.json({error: "Failed to create task " + error}, {status: 500});
  }
}

// UPDATE task
export async function PUT(req: NextRequest) {
  try {
    const idParam : unknown = req?.nextUrl?.searchParams?.get("id");

    const id = idParam as string;
    
    const { title, description, completed } = await req.json();

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, completed },
    })

    return NextResponse.json(updatedTask);
  }catch (error) {
    return NextResponse.json({ error: "Failed to update task " + error}, { status: 500});
  }
}

// DELETE task
export async function DELETE(req: NextRequest) {
  try {
    const idParam : unknown = req?.nextUrl?.searchParams?.get("id");

    const id = idParam as string;

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({message: "Task deleted successfully"});
  }catch (error) {
    return NextResponse.json({ error: "Failed to delete task " + error }, { status : 500 });
  }
}