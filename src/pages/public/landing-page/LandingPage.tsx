import React from 'react'
import { appData } from '../../../data/appData'
import VideoSection from '../../../components/organisms/video-section/VideoSection'
import ProblemSolutionSection from '../../../components/organisms/problem-solution-section/ProblemSolutionSection'
import StatsSection from '../../../components/organisms/stats-section/StatsSection'
import TestimonialsSection from '../../../components/organisms/testimonials-section/TestimonialsSection'
import CourseInclusionsSection from '../../../components/organisms/course-inclusions-section/CourseInclusionsSection'
import FAQSection from '../../../components/organisms/faq-section/FAQSection'
//import UrgencyNotification from '../../../components/organisms/urgency-notification/UrgencyNotification'
import CTAUrgencySection from '../../../components/organisms/cta-urgency-section/CTAUrgencySection'
import TrustBadgesSection from '../../../components/organisms/trust-badges-section/TrustBadgesSection'
import FloatingCTA from '../../../components/molecules/floating-cta/FloatingCTA'

const LandingPage: React.FC = () => {
  return (
    <div>

      {/* Seccion de video */}
      <VideoSection />

      {/* Seccion Problemas y Soluciones */}
      <ProblemSolutionSection data={appData.problemSolution} />

      {/* Seccion de estadisticas */}
      <StatsSection stats={appData.stats.stats} />

      {/* Seccion de testimonios */}
      <TestimonialsSection 
        title={appData.testimonials.title}
        subtitle={appData.testimonials.subtitle}
        testimonials={appData.testimonials.testimonials}
      />

      {/* Seccion de incluciones */}
      <CourseInclusionsSection
        title={appData.courseInclusions.title}
        subtitle={appData.courseInclusions.subtitle}
        inclusions={appData.courseInclusions.inclusions}
      />

      {/* Seccion de FAQ */}
      <FAQSection
        title={appData.faq.title}
        subtitle={appData.faq.subtitle}
        faqs={appData.faq.faqs}
      />

      {/* Aqui colocamos el componente de la notificacion de urgencia */}
      {/* <UrgencyNotification /> */}
      
      {/* Seccion de CTA de urgencia */}
      <CTAUrgencySection
        title={appData.ctaUrgency.title}
        subtitle={appData.ctaUrgency.subtitle}
        price={appData.ctaUrgency.price}
        originalPrice={appData.ctaUrgency.originalPrice}
        buttonText={appData.ctaUrgency.buttonText}
        urgencyLabel={appData.ctaUrgency.urgencyLabel}
        urgencyTime={appData.ctaUrgency.urgencyTime}
      />

      {/* Seccion de badges de confianza */}
      <TrustBadgesSection badges={appData.trustBadges.badges} />

      {/* Seccion de CTA de flotante */}
      <FloatingCTA 
        text="Comprar Ahora" 
        onClick={() => document.getElementById('comprar')?.scrollIntoView({ behavior: 'smooth' })}
      />
    </div>
  )
}

export default LandingPage