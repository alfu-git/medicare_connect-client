// app/api/doctors/[id]/route.js
import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { doctorId } = await params; // ✅ Next.js 15-এ await করতে হবে

    if (!ObjectId.isValid(doctorId)) {
      return Response.json({ error: "Invalid doctor ID" }, { status: 400 });
    }

    const db = await connectDB();
    const doctor = await db
      .collection("doctors")
      .findOne({ _id: new ObjectId(doctorId) });

    if (!doctor) {
      return Response.json({ error: "Doctor not found" }, { status: 404 });
    }

    return Response.json(doctor);
  } catch (error) {
    console.error("Doctor fetch error:", error);
    return Response.json({ error: "Failed to fetch doctor" }, { status: 500 });
  }
}
