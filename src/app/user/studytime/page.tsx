// app/study-time/page.tsx - Study Time Page
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Timer, BookOpen, Plus } from "lucide-react";

export default function StudyTimePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      {/* Shared Sidebar */}

      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Study Time</h1>
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            New Session
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-gray-500 mb-1">Total Study Time</h3>
                <div className="text-2xl font-bold">45h 22m</div>
              </div>
            </div>
          </div>
          {/* Add more stats cards... */}
        </div>

        {/* Calendar View */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
          <h2 className="text-xl font-bold mb-4">Study Calendar</h2>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(31)].map((_, day) => (
              <div
                key={day}
                className="aspect-square flex items-center justify-center rounded-lg bg-gray-50 hover:bg-blue-50 cursor-pointer"
              >
                {day + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Current Session */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Current Session</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Timer className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-gray-500">Elapsed Time</h3>
                <div className="text-2xl font-bold">25:43</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="text-red-500">
                Stop Session
              </Button>
              <Button className="bg-green-500 text-white hover:bg-green-600">
                Complete Session
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
