import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//GET all tasks
export async function GET() {
  try{
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  }catch(error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// POST request handler for creating tasks
export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();

    if (!title || title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: { title, description },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    // Handle database or internal errors
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

// PUT request handler for updating tasks
export async function PUT(req: NextRequest) {
  try {
    const idParam: unknown = req?.nextUrl?.searchParams?.get("id");
    const id = idParam as string;
    const data = await req.json();

    if (!data.title || data.title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: data,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// DELETE request handler for deleting tasks
export async function DELETE(req: NextRequest) {
  try {
    const idParam: unknown = req?.nextUrl?.searchParams?.get("id");
    const id = idParam as string;

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
