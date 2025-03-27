"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  format,
  subYears,
  addYears,
  eachWeekOfInterval,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
  startOfYear,
  endOfYear,
  isWithinInterval,
  addDays,
  getMonth,
  isFirstDayOfMonth,
} from "date-fns"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActivityCalendarProps {
  data: Record<string, number>
}

export default function ActivityCalendar({ data }: ActivityCalendarProps) {
  const [currentYear, setCurrentYear] = useState(new Date())
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [needsScroll, setNeedsScroll] = useState(false)

  // Get start and end of the current year
  const yearStart = startOfYear(currentYear)
  const yearEnd = endOfYear(currentYear)

  // Get all weeks in the year
  const weeks = eachWeekOfInterval(
    { start: yearStart, end: yearEnd },
    { weekStartsOn: 0 }, // 0 = Sunday
  )

  // Check if horizontal scrolling is needed
  useEffect(() => {
    const checkForScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current
        setNeedsScroll(scrollWidth > clientWidth)
      }
    }

    checkForScroll()
    window.addEventListener("resize", checkForScroll)

    return () => {
      window.removeEventListener("resize", checkForScroll)
    }
  }, [])

  const previousYear = () => {
    setCurrentYear(subYears(currentYear, 1))
  }

  const nextYear = () => {
    setCurrentYear(addYears(currentYear, 1))
  }

  const getActivityLevel = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return data[dateStr] || 0
  }

  const getActivityColor = (level: number) => {
    if (level === 0) return "bg-gray-200 hover:bg-gray-300"
    if (level === 1) return "bg-forest-100 hover:bg-forest-200"
    if (level === 2) return "bg-forest-300 hover:bg-forest-400"
    if (level === 3) return "bg-forest-500 hover:bg-forest-600"
    return "bg-forest hover:bg-forest-800"
  }

  // Check if this week contains the first day of a month
  const isMonthBoundaryWeek = (week: Date) => {
    const days = eachDayOfInterval({
      start: startOfWeek(week, { weekStartsOn: 0 }),
      end: endOfWeek(week, { weekStartsOn: 0 }),
    })

    return days.some((day) => isFirstDayOfMonth(day))
  }

  // Generate month labels
  const monthLabels = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const labels = []

    for (let i = 0; i < 12; i++) {
      // Calculate position based on weeks
      const monthStart = new Date(currentYear.getFullYear(), i, 1)
      const weekIndex = weeks.findIndex((week) => isWithinInterval(monthStart, { start: week, end: addDays(week, 6) }))

      // Calculate position percentage
      const weekOfMonth = Math.floor((weekIndex / weeks.length) * 100)

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
      )
    }

    return labels
  }

  return (
    <TooltipProvider>
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h3 className="font-medium text-lg">{format(currentYear, "yyyy")} Activity</h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  This calendar shows your daily learning activity throughout the year. Darker colors indicate more
                  activity on that day.
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

        <div className="relative w-[700px]">
          {/* Month labels */}
          <div className="relative h-5 mb-1 sticky left-0 bg-background z-10">{monthLabels()}</div>

          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col mr-2 pt-2 sticky left-0 bg-background z-10">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                <div
                  key={day}
                  className="text-xs text-muted-foreground h-3 flex items-center justify-end pr-1"
                  style={{ height: "10px", marginBottom: "2px" }}
                >
                  {index % 2 === 0 ? day : ""}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div
              className={`flex-1 ${needsScroll ? "overflow-x-auto" : ""}`}
              ref={scrollContainerRef}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "var(--forest-300) transparent",
              }}
            >
              <div className="flex">
                {weeks.map((week, weekIndex) => {
                  const days = eachDayOfInterval({
                    start: startOfWeek(week, { weekStartsOn: 0 }),
                    end: endOfWeek(week, { weekStartsOn: 0 }),
                  })

                  // Check if this week contains the first day of a month
                  const isMonthBoundary = isMonthBoundaryWeek(week)

                  // Get the month of the first day of the week
                  const weekMonth = getMonth(days[0])

                  return (
                    <div
                      key={week.toString()}
                      className={`flex flex-col gap-1 ${
                        isMonthBoundary ? "border-l border-gray-200 dark:border-gray-700 pl-1 ml-1" : ""
                      }`}
                    >
                      {days.map((day) => {
                        const activityLevel = getActivityLevel(day)
                        const isToday = isSameDay(day, new Date())
                        const isCurrentYear = day.getFullYear() === currentYear.getFullYear()

                        return (
                          <Tooltip key={day.toString()}>
                            <TooltipTrigger asChild>
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: isCurrentYear ? 1 : 0.5 }}
                                transition={{ duration: 0.2 }}
                                className="relative"
                                onMouseEnter={() => setHoveredDate(day)}
                                onMouseLeave={() => setHoveredDate(null)}
                              >
                                <div
                                  className={`
                                    w-3 h-3 rounded-sm cursor-pointer transition-colors
                                    ${isToday ? "ring-1 ring-forest" : ""}
                                    ${getActivityColor(activityLevel)}
                                    ${isFirstDayOfMonth(day) ? "border-l-2 border-gray-300 dark:border-gray-600" : ""}
                                  `}
                                />
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs">
                                <p className="font-medium">{format(day, "MMMM d, yyyy")}</p>
                                <p>
                                  {activityLevel === 0
                                    ? "No activity"
                                    : `${activityLevel} ${activityLevel === 1 ? "activity" : "activities"}`}
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1 mr-4">Less</div>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`
                    w-3 h-3 rounded-sm
                    ${
                      level === 0
                        ? "bg-gray-200"
                        : level === 1
                          ? "bg-forest-100"
                          : level === 2
                            ? "bg-forest-300"
                            : level === 3
                              ? "bg-forest-500"
                              : "bg-forest"
                    }
                  `}
                />
              ))}
            </div>
            <div className="flex items-center gap-1 ml-1">More</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

