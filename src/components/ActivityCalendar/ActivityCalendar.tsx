"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  format,
  subYears,
  addYears,
  eachWeekOfInterval,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  addDays,
  isFirstDayOfMonth,
  startOfYear,
  endOfYear,
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
  const [currentYear, setCurrentYear] = useState(new Date());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = useState(false);
  const [data, setData] = useState<Record<string, boolean>>({});

  const yearStart = startOfYear(currentYear);
  const yearEnd = endOfYear(currentYear);
  const weeks = eachWeekOfInterval(
    { start: yearStart, end: yearEnd },
    { weekStartsOn: 0 },
  );

  useEffect(() => {
    const fetchData = async () => {
      const year = currentYear.getFullYear();
      const response = (await api.fetchUserTrackingDays(
        year,
      )) as UserTrackingDaysResponse;
      const loginDays = response.days;
      const dataObj = loginDays.reduce(
        (acc, dateStr) => {
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

  const previousYear = () => setCurrentYear(subYears(currentYear, 1));
  const nextYear = () => setCurrentYear(addYears(currentYear, 1));

  const isMonthBoundaryWeek = (week: Date) => {
    const days = eachDayOfInterval({
      start: startOfWeek(week, { weekStartsOn: 0 }),
      end: endOfWeek(week, { weekStartsOn: 0 }),
    });
    return days.some((day: string) => isFirstDayOfMonth(day));
  };

  const monthLabels = () => {
    const months = [
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
    ];
    const labels = [];
    for (let i = 0; i < 12; i++) {
      const monthStart = new Date(currentYear.getFullYear(), i, 1);
      const weekIndex = weeks.findIndex((week: string) =>
        isWithinInterval(monthStart, { start: week, end: addDays(week, 6) }),
      );
      const weekOfMonth = Math.floor((weekIndex / weeks.length) * 100);
      labels.push(
        <div
          key={months[i]}
          className="text-xs text-muted-foreground font-medium"
          style={{
            position: "absolute",
            top: "-20px",
            left: `${weekOfMonth}%`,
          }}
        >
          {months[i]}
        </div>,
      );
    }
    return labels;
  };

  return (
    <TooltipProvider>
      <div className="w-full">
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

        <div className="relative">
          <div className="ml-14 w-[750px] relative h-5 mb-1 left-0 bg-background z-10">
            {monthLabels()}
          </div>

          <div className="flex">
            <div className="flex flex-col mr-2 pt-2 sticky left-0 bg-background z-10">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <div
                    key={day}
                    className="text-xs text-muted-foreground h-3 flex items-center justify-end pr-1"
                    style={{ height: "10px", marginBottom: "2px" }}
                  >
                    {index % 2 === 0 ? day : ""}
                  </div>
                ),
              )}
            </div>

            <div
              className={`flex-1 ${needsScroll ? "overflow-x-auto" : ""}`}
              ref={scrollContainerRef}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "var(--forest-300) transparent",
              }}
            >
              <div className="flex">
                {weeks.map((week: Date) => {
                  const days = eachDayOfInterval({
                    start: startOfWeek(week, { weekStartsOn: 0 }),
                    end: endOfWeek(week, { weekStartsOn: 0 }),
                  });
                  const isMonthBoundary = isMonthBoundaryWeek(week);

                  return (
                    <div
                      key={week.toString()}
                      className={`flex flex-col gap-1 ${
                        isMonthBoundary
                          ? "border-l border-gray-300 dark:border-gray-600 pl-1 ml-1"
                          : ""
                      }`}
                    >
                      {days.map((day: Date) => {
                        const dateStr = format(day, "yyyy-MM-dd");
                        const isActive = !!data[dateStr];
                        const isInYear = isWithinInterval(day, {
                          start: yearStart,
                          end: yearEnd,
                        });

                        return (
                          <Tooltip key={dateStr}>
                            <TooltipTrigger asChild>
                              <motion.div
                                className={`w-3 h-3 rounded-sm ${
                                  isInYear
                                    ? isActive
                                      ? "bg-green-500"
                                      : "bg-gray-200"
                                    : "bg-transparent"
                                }`}
                                // onHoverStart={() => setHoveredDate(day)}
                                // onHoverEnd={() => setHoveredDate(null)}
                                whileHover={{ scale: 1.2 }}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{format(day, "MMMM d, yyyy")}</p>
                              <p>{isActive ? "Logged in" : "No login"}</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm" />
            <span className="text-sm text-muted-foreground">Login day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-sm" />
            <span className="text-sm text-muted-foreground">No login</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
