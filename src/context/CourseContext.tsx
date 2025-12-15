import React, { createContext, useContext, useState, ReactNode } from 'react'

interface CourseContextType {
  selectedLessonId: string | null
  setSelectedLessonId: (lessonId: string | null) => void
}

const CourseContext = createContext<CourseContextType | undefined>(undefined)

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

  return (
    <CourseContext.Provider value={{ selectedLessonId, setSelectedLessonId }}>
      {children}
    </CourseContext.Provider>
  )
}

export const useCourse = () => {
  const context = useContext(CourseContext)
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider')
  }
  return context
}


