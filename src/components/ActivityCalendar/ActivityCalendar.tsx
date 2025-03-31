"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  format,
  subYears,
  addYears,
  eachDayOfInterval,
  isWithinInterval,
  startOfYear,
  endOfYear,
  getMonth,
} from "date-fns";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import api from "@/clients/api/api";

interface ActivityCalendarProps {}

interface UserTrackingDaysResponse {
  days: string[];
}

export default function ActivityCalendar({}: ActivityCalendarProps) {
  const [currentYear, setCurrentYear] = useState<Date>(new Date());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = useState<boolean>(false);
  const [data, setData] = useState<Record<string, boolean>>({});

  const yearStart: Date = startOfYear(currentYear);
  const yearEnd: Date = endOfYear(currentYear);

  // Get all days of the year
  const allDays: Date[] = eachDayOfInterval({ start: yearStart, end: yearEnd });

  // Group days into weeks (7-day chunks) starting from January 1
  const weeks: Date[][] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  // Group weeks by month based on the first day of the week
  const weeksByMonth: { monthIndex: number; weeks: Date[][] }[] = [];
  const seenMonths = new Set<number>();
  weeks.forEach((week) => {
    const monthIndex: number = getMonth(week[0]); // Month of the week's first day
    if (!seenMonths.has(monthIndex)) {
      seenMonths.add(monthIndex);
      weeksByMonth.push({ monthIndex, weeks: [] });
    }
    const currentMonthEntry = weeksByMonth.find(
      (entry) => entry.monthIndex === monthIndex,
    );
    if (currentMonthEntry) {
      currentMonthEntry.weeks.push(week);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const year: number = currentYear.getFullYear();
      const response = (await api.fetchUserTrackingDays(
        year,
      )) as UserTrackingDaysResponse;
      const loginDays: string[] = response.days;
      const dataObj: Record<string, boolean> = loginDays.reduce(
        (acc: Record<string, boolean>, dateStr: string) => {
          acc[dateStr] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      );
      setData(dataObj);
    };
    fetchData();
  }, [currentYear]);

  useEffect(() => {
    const checkForScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setNeedsScroll(scrollWidth > clientWidth);
      }
    };
    checkForScroll();
    window.addEventListener("resize", checkForScroll);
    return () => window.removeEventListener("resize", checkForScroll);
  }, []);

  const previousYear = (): void => setCurrentYear(subYears(currentYear, 1));
  const nextYear = (): void => setCurrentYear(addYears(currentYear, 1));

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ] as const;

  return (
    <TooltipProvider>
      <div className="w-full md:w-[50vw]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h3 className="font-medium text-lg">
              {format(currentYear, "yyyy")} Activity
            </h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  This calendar shows the days you logged in throughout the
                  year. Green indicates a login day, gray indicates no login.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={previousYear}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              {format(subYears(currentYear, 1), "yyyy")}
            </Button>
            <Button variant="outline" size="sm" onClick={nextYear}>
              {format(addYears(currentYear, 1), "yyyy")}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        <div
          className={`flex ${needsScroll ? "overflow-x-auto" : ""}`}
          ref={scrollContainerRef}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "var(--forest-300) transparent",
          }}
        >
          <div className="flex flex-col sticky left-0 bg-white dark:bg-forest z-10">
            <div className="h-5" /> {/* Spacer for month labels */}
            <div className="flex flex-col gap-1 pt-2">
              {["Sun", "", "Tue", "", "Thu", "", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-xs text-muted-foreground h-3 flex items-center justify-end pr-1"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-1">
            {weeksByMonth.map(({ monthIndex, weeks }) => (
              <div key={monthIndex} className="flex flex-col">
                <div className="ml-6 h-5">
                  <div className="text-xs text-muted-foreground font-medium">
                    {monthNames[monthIndex]}
                  </div>
                </div>
                <div className="flex gap-1">
                  {weeks.map((week: Date[], weekIndex: number) => (
                    <div
                      key={weekIndex}
                      className="flex flex-col gap-1"
                    >
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((_, dayIndex) => {
                        const day = week[dayIndex];
                        const dateStr: string = day ? format(day, "yyyy-MM-dd") : "";
                        const isActive: boolean = !!data[dateStr];
                        const isInYear: boolean = day
                          ? isWithinInterval(day, { start: yearStart, end: yearEnd })
                          : false;

                        return (
                          <Tooltip key={dayIndex}>
                            <TooltipTrigger asChild>
                              <motion.div
                                className={`w-3 h-3 ${
                                  day && isInYear
                                    ? isActive
                                      ? "bg-green-500"
                                      : "bg-gray-200"
                                    : "bg-transparent"
                                }`}
                                whileHover={{ scale: 1.2 }}
                              />
                            </TooltipTrigger>
                            {day && (
                              <TooltipContent>
                                <p>{format(day, "MMMM d, yyyy")}</p>
                                <p>{isActive ? "Logged in" : "No login"}</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500" />
            <span className="text-sm text-muted-foreground">Login day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200" />
            <span className="text-sm text-muted-foreground">No login</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}