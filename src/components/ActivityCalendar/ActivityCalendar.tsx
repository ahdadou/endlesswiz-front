"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  format,
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityCalendarProps {
  data: Record<string, number>;
}

export default function ActivityCalendar({ data }: ActivityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  //   const days = eachDayOfInterval({ start: startDate, end: endDate })
  const days = [23, 23];

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const getActivityLevel = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return data[dateStr] || 0;
  };

  const getActivityColor = (level: number) => {
    if (level === 0) return "bg-gray-200";
    if (level === 1) return "bg-forest-100";
    if (level === 2) return "bg-forest-300";
    if (level === 3) return "bg-forest-500";
    return "bg-forest";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{format(currentDate, "MMMM yyyy")}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs text-muted-foreground py-1"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: startDate.getDay() }).map((_, index) => (
          <div key={`empty-${index}`} className="h-10" />
        ))}

        {days?.map((day) => {
          const activityLevel = getActivityLevel(day);
          const isToday = isSameDay(day, new Date());

          return (
            <motion.div
              key={day.toString()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="relative h-10 flex items-center justify-center"
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs
                  ${isToday ? "border-2 border-forest" : ""}
                  ${activityLevel > 0 ? getActivityColor(activityLevel) : ""}
                  ${activityLevel > 0 ? "text-white" : "text-gray-700"}
                `}
              >
                {format(day, "d")}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
