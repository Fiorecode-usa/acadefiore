import React from 'react'
import { appData } from '../../../data/appData'
import VideoSection from '../../../components/organisms/video-section/VideoSection'
import ProblemSolutionSection from '../../../components/organisms/problem-solution-section/ProblemSolutionSection'
import StatsSection from '../../../components/organisms/stats-section/StatsSection'
import TestimonialsSection from '../../../components/organisms/testimonials-section/TestimonialsSection'
import CourseInclusionsSection from '../../../components/organisms/course-inclusions-section/CourseInclusionsSection'
import FAQSection from '../../../components/organisms/faq-section/FAQSection'
import UrgencyNotification from '../../../components/organisms/urgency-notification/UrgencyNotification'
import CTAUrgencySection from '../../../components/organisms/cta-urgency-section/CTAUrgencySection'
import TrustBadgesSection from '../../../components/organisms/trust-badges-section/TrustBadgesSection'
import FloatingCTA from '../../../components/molecules/floating-cta/FloatingCTA'

const LandingPage: React.FC = () => {
  return (
    <div>
      <VideoSection />
      <ProblemSolutionSection data={appData.problemSolution} />
      <StatsSection stats={appData.stats.stats} />
      <TestimonialsSection 
        title={appData.testimonials.title}
        subtitle={appData.testimonials.subtitle}
        testimonials={appData.testimonials.testimonials}
      />
      <CourseInclusionsSection
        title={appData.courseInclusions.title}
        subtitle={appData.courseInclusions.subtitle}
        inclusions={appData.courseInclusions.inclusions}
      />
      <FAQSection
        title={appData.faq.title}
        subtitle={appData.faq.subtitle}
        faqs={appData.faq.faqs}
      />
      <UrgencyNotification />
      <CTAUrgencySection
        title={appData.ctaUrgency.title}
        subtitle={appData.ctaUrgency.subtitle}
        price={appData.ctaUrgency.price}
        originalPrice={appData.ctaUrgency.originalPrice}
        buttonText={appData.ctaUrgency.buttonText}
        urgencyLabel={appData.ctaUrgency.urgencyLabel}
        urgencyTime={appData.ctaUrgency.urgencyTime}
      />
      <TrustBadgesSection badges={appData.trustBadges.badges} />
      <FloatingCTA 
        text="Comprar Ahora" 
        onClick={() => document.getElementById('comprar')?.scrollIntoView({ behavior: 'smooth' })}
      />
    </div>
  )
}

export default LandingPage