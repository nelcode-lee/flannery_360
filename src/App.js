import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Book, 
  User, 
  BarChart3, 
  Search, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Settings, 
  Play, 
  Award, 
  FileText,
  Phone, 
  Mail, 
  MessageCircle, 
  Globe, 
  HelpCircle, 
  ExternalLink, 
  BookOpen,
  Bookmark,
  Check,
  X as XIcon,
  RotateCcw
} from 'lucide-react';

const FlanneryLogo = () => (
  <div className="flex items-center space-x-2">
    <div className="text-xl font-bold text-white tracking-wider">FLANNERY</div>
    <div className="text-xs text-white">®</div>
  </div>
);

const FlanneryTrainingApp = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedSections, setCompletedSections] = useState(new Set());
  const [knowledgeAnswers, setKnowledgeAnswers] = useState({});
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [showSearch, setShowSearch] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [answerFeedback, setAnswerFeedback] = useState({});
  const [knowledgeProgress, setKnowledgeProgress] = useState({});
  const [finalTestAnswers, setFinalTestAnswers] = useState({});
  const [finalTestSubmitted, setFinalTestSubmitted] = useState(false);
  const [finalTestScore, setFinalTestScore] = useState(null);
  const [showFinalTest, setShowFinalTest] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [totalLearningTime, setTotalLearningTime] = useState(0);
  const [currentSessionTime, setCurrentSessionTime] = useState(0);
  const [sectionTimeTracking, setSectionTimeTracking] = useState({});
  const [activeSectionStartTime, setActiveSectionStartTime] = useState(null);
  const [showAllObjectives, setShowAllObjectives] = useState(false);

  // Knowledge check answers with correct responses
  const correctAnswers = {
    'intro-1': {
      type: 'multiple-choice',
      question: 'What is a 360 Excavator?',
      options: [
        'A type of crane used in construction',
        'A heavy construction machine with boom, dipper, bucket and cab on rotating platform',
        'A bulldozer with tracks',
        'A wheeled loader for material handling'
      ],
      correctAnswer: 1
    },
    'intro-2': {
      type: 'multiple-choice',
      question: 'List 4 main hazards commonly found on construction sites:',
      options: [
        'Moving vehicles and machinery only',
        'Moving vehicles, working at height, excavations, falling materials',
        'Working at height and excavations only',
        'Falling materials and excavations only'
      ],
      correctAnswer: 1
    },
    'intro-3': {
      type: 'multiple-choice',
      question: 'List 5 effects of hazards:',
      options: [
        'Injury or death only',
        'Property damage and environmental damage',
        'Injury, property damage, environmental damage, financial loss, legal consequences',
        'Environmental damage and financial loss only'
      ],
      correctAnswer: 2
    },
    'legislation-1': {
      type: 'multiple-choice',
      question: 'What does the Health & Safety at Work etc. Act 1974 require employers to do, specifically regarding plant?',
      options: [
        'Provide safe working conditions only',
        'Maintain equipment properly only',
        'Provide safe working conditions and ensure equipment is properly maintained',
        'Nothing specific regarding plant operations'
      ],
      correctAnswer: 2
    },
    'legislation-2': {
      type: 'multiple-choice',
      question: 'List the 3 main duties placed on employees under the Health and Safety at Work act 1974:',
      options: [
        'Take reasonable care of themselves only',
        'Take reasonable care of themselves and others, co-operate with employer, use equipment properly',
        'Co-operate with employer only',
        'Use equipment and safety devices only'
      ],
      correctAnswer: 1
    },
    'components-1': {
      type: 'multiple-choice',
      question: 'Why must gloves always be worn when checking engine oil level?',
      options: [
        'To keep hands warm during cold weather',
        'To improve grip on slippery surfaces',
        'To prevent skin disease and contamination',
        'To look professional on site'
      ],
      correctAnswer: 2
    },
    'components-2': {
      type: 'multiple-choice',
      question: 'If an operator has to top-up the hydraulic oil, state two precautions that ensure cleanliness of the system:',
      options: [
        'Ensure filler cap area is clean only',
        'Ensure filler cap area is clean and use clean container when filling',
        'Use clean container only',
        'No special precautions are needed'
      ],
      correctAnswer: 1
    },
    'components-3': {
      type: 'multiple-choice',
      question: 'Why should the machine be re-fuelled at the end of the day?',
      options: [
        'To save time in the morning',
        'To prevent condensation building up in tank',
        'To ensure fuel is always available',
        'To reduce overall fuel costs'
      ],
      correctAnswer: 1
    },
    'components-4': {
      type: 'multiple-choice',
      question: 'In what situation does a hard hat not need to be worn when operating plant machinery?',
      options: [
        'When working indoors only',
        'When working alone on site',
        'When sitting in enclosed cab that meets FOPS criteria',
        'When working at night time'
      ],
      correctAnswer: 2
    },
    'components-5': {
      type: 'multiple-choice',
      question: 'What is the purpose of ROPS on an excavator?',
      options: [
        'To protect against falling objects',
        'Roll Over Protection System - protects operator in rollover',
        'To improve machine stability',
        'To reduce noise levels'
      ],
      correctAnswer: 1
    },
    'components-6': {
      type: 'multiple-choice',
      question: 'What should you check before starting the engine?',
      options: [
        'Fuel level only',
        'Hydraulic oil level only',
        'Fuel level, hydraulic oil level, coolant level, and engine oil level',
        'Coolant level only'
      ],
      correctAnswer: 2
    },
    'components-7': {
      type: 'multiple-choice',
      question: 'What is the function of the hydraulic system?',
      options: [
        'To provide power for machine movement and attachments',
        'To cool the engine during operation',
        'To provide electrical power to systems',
        'To provide fuel to the engine'
      ],
      correctAnswer: 0
    },
    'components-8': {
      type: 'multiple-choice',
      question: 'What should you do if you notice hydraulic oil leaking?',
      options: [
        'Continue working normally',
        'Stop work immediately and report the leak',
        'Try to fix it yourself',
        'Ignore it if it\'s a small leak'
      ],
      correctAnswer: 1
    },
    'risk-1': {
      type: 'multiple-choice',
      question: 'What is the first step in risk assessment?',
      options: [
        'Implement control measures',
        'Identify hazards',
        'Evaluate risks',
        'Review the assessment'
      ],
      correctAnswer: 1
    },
    'risk-2': {
      type: 'multiple-choice',
      question: 'What is a hazard?',
      options: [
        'Something that could cause harm',
        'Something that has already caused harm',
        'A safety procedure',
        'A type of PPE'
      ],
      correctAnswer: 0
    },
    'risk-3': {
      type: 'multiple-choice',
      question: 'What is the hierarchy of control measures?',
      options: [
        'Eliminate, Substitute, Engineering controls, Administrative controls, PPE',
        'PPE, Administrative controls, Engineering controls, Substitute, Eliminate',
        'Engineering controls, Administrative controls, PPE, Substitute, Eliminate',
        'Substitute, Eliminate, Engineering controls, PPE, Administrative controls'
      ],
      correctAnswer: 0
    },
    'site-1': {
      type: 'multiple-choice',
      question: 'What should you do during site induction?',
      options: [
        'Learn site rules only',
        'Learn site rules, emergency procedures, and identify key personnel',
        'Learn emergency procedures only',
        'Identify key personnel only'
      ],
      correctAnswer: 1
    },
    'site-2': {
      type: 'multiple-choice',
      question: 'What is a permit to work?',
      options: [
        'A document that authorizes specific work activities',
        'A safety certificate for operators',
        'A training record book',
        'A maintenance log book'
      ],
      correctAnswer: 0
    },
    'preop-1': {
      type: 'multiple-choice',
      question: 'What is the purpose of pre-operational checks?',
      options: [
        'To check the engine only',
        'To check the hydraulic system only',
        'To ensure the machine is safe and ready for operation',
        'To check the tracks only'
      ],
      correctAnswer: 2
    },
    'preop-2': {
      type: 'multiple-choice',
      question: 'What should you check before starting work?',
      options: [
        'Engine only',
        'Engine, hydraulic system, tracks, and safety devices',
        'Hydraulic system only',
        'Tracks only'
      ],
      correctAnswer: 1
    },
    'travel-1': {
      type: 'multiple-choice',
      question: 'What should you check before site travel?',
      options: [
        'Route safety only',
        'Route safety, ground conditions, and overhead obstructions',
        'Ground conditions only',
        'Overhead obstructions only'
      ],
      correctAnswer: 1
    },
    'travel-2': {
      type: 'multiple-choice',
      question: 'What is the maximum travel speed on site?',
      options: [
        '10 mph',
        '5 mph',
        '15 mph',
        '20 mph'
      ],
      correctAnswer: 1
    },
    'confined-1': {
      type: 'multiple-choice',
      question: 'What is a confined area?',
      options: [
        'Any small area',
        'Areas with limited access only',
        'An area with limited access, restricted movement, or poor ventilation',
        'Areas with poor ventilation only'
      ],
      correctAnswer: 2
    },
    'confined-2': {
      type: 'multiple-choice',
      question: 'What should you do before entering a confined area?',
      options: [
        'Enter immediately',
        'Check for hazards and ensure proper ventilation',
        'Check for hazards only',
        'Ensure ventilation only'
      ],
      correctAnswer: 1
    },
    'quickhitch-1': {
      type: 'multiple-choice',
      question: 'What is a quick hitch system?',
      options: [
        'A system for quick engine start',
        'A system for quick fuel filling',
        'A system that allows rapid attachment and detachment of buckets and tools',
        'A system for quick maintenance'
      ],
      correctAnswer: 2
    },
    'quickhitch-2': {
      type: 'multiple-choice',
      question: 'What should you check after attaching a bucket?',
      options: [
        'The attachment only',
        'The attachment, security, and operation',
        'The security only',
        'The operation only'
      ],
      correctAnswer: 1
    },
    'excavating-1': {
      type: 'multiple-choice',
      question: 'What is the correct digging technique?',
      options: [
        'Start from the bottom',
        'Start from the top, work in layers, and maintain proper depth',
        'Dig randomly',
        'Dig as deep as possible immediately'
      ],
      correctAnswer: 1
    },
    'excavating-2': {
      type: 'multiple-choice',
      question: 'What should you do when excavating near underground services?',
      options: [
        'Dig carefully',
        'Locate and mark services before digging',
        'Use a smaller bucket',
        'Work faster to avoid delays'
      ],
      correctAnswer: 1
    },
    'services-1': {
      type: 'multiple-choice',
      question: 'What should you check when loading transporting vehicles?',
      options: [
        'Vehicle stability only',
        'Vehicle stability, load distribution, and securement',
        'Load distribution only',
        'Securement only'
      ],
      correctAnswer: 1
    },
    'services-2': {
      type: 'multiple-choice',
      question: 'What is the maximum load capacity?',
      options: [
        'Check the machine\'s rated capacity',
        'Load as much as possible',
        'Estimate the weight',
        'Ask a colleague'
      ],
      correctAnswer: 0
    },
    'types-1': {
      type: 'multiple-choice',
      question: 'What are the main types of excavation?',
      options: [
        'Trenching only',
        'Bulk excavation only',
        'Trenching, bulk excavation, and foundation work',
        'Foundation work only'
      ],
      correctAnswer: 2
    },
    'types-2': {
      type: 'multiple-choice',
      question: 'What is bulk excavation?',
      options: [
        'Removing large volumes of material',
        'Trenching only',
        'Foundation work only',
        'Landscaping only'
      ],
      correctAnswer: 0
    },
    'trenching-1': {
      type: 'multiple-choice',
      question: 'What is the maximum depth for unsupported trenches?',
      options: [
        '2 meters',
        '3 meters',
        '1.2 meters (4 feet)',
        'No limit'
      ],
      correctAnswer: 2
    },
    'trenching-2': {
      type: 'multiple-choice',
      question: 'What should you do when trenching?',
      options: [
        'Work quickly',
        'Check for services and use proper support',
        'Check for services only',
        'Use support only'
      ],
      correctAnswer: 1
    },
    'lifting-1': {
      type: 'multiple-choice',
      question: 'What should you check before lifting operations?',
      options: [
        'Load weight only',
        'Load weight, lifting capacity, and ground conditions',
        'Lifting capacity only',
        'Ground conditions only'
      ],
      correctAnswer: 1
    },
    'lifting-2': {
      type: 'multiple-choice',
      question: 'What is the safe working load?',
      options: [
        'The maximum load the machine can lift',
        'The load that can be lifted safely',
        'The minimum load required',
        'The average load weight'
      ],
      correctAnswer: 1
    },
    'environmental-1': {
      type: 'multiple-choice',
      question: 'What environmental considerations should you have?',
      options: [
        'Minimize soil disturbance only',
        'Prevent contamination only',
        'Minimize soil disturbance, prevent contamination, and protect wildlife',
        'Protect wildlife only'
      ],
      correctAnswer: 2
    },
    'environmental-2': {
      type: 'multiple-choice',
      question: 'What should you do with waste materials?',
      options: [
        'Leave them on site',
        'Dispose of them properly',
        'Bury them',
        'Burn them'
      ],
      correctAnswer: 1
    },
    'transport-1': {
      type: 'multiple-choice',
      question: 'What should you check before transporting the excavator?',
      options: [
        'Transport route only',
        'Vehicle capacity only',
        'Transport route, vehicle capacity, and securing methods',
        'Securing methods only'
      ],
      correctAnswer: 2
    },
    'transport-2': {
      type: 'multiple-choice',
      question: 'What is the maximum transport speed?',
      options: [
        '30 mph',
        '40 mph',
        '50 mph',
        '60 mph'
      ],
      correctAnswer: 1
    },
    'shutdown-1': {
      type: 'multiple-choice',
      question: 'What is the correct shutdown procedure?',
      options: [
        'Lower attachments only',
        'Engage parking brake only',
        'Lower attachments, engage parking brake, and turn off engine',
        'Turn off engine only'
      ],
      correctAnswer: 2
    },
    'shutdown-2': {
      type: 'multiple-choice',
      question: 'What should you do after shutdown?',
      options: [
        'Leave immediately',
        'Remove key and secure machine',
        'Remove key only',
        'Secure machine only'
      ],
      correctAnswer: 1
    }
  };

  // Final Test Questions - One from each module with randomized positions
  const finalTestQuestions = {
    'final-intro': {
      type: 'multiple-choice',
      question: 'What is a 360 Excavator?',
      options: [
        'A type of crane used in construction',
        'A heavy construction machine with boom, dipper, bucket and cab on rotating platform',
        'A bulldozer with tracks',
        'A wheeled loader for material handling'
      ],
      correctAnswer: 1,
      module: 'Introduction'
    },
    'final-legislation': {
      type: 'multiple-choice',
      question: 'What does the Health & Safety at Work etc. Act 1974 require employers to do, specifically regarding plant?',
      options: [
        'Only provide safe working conditions',
        'Only maintain equipment',
        'Provide safe working conditions and equipment, ensure equipment is properly maintained',
        'Nothing specific regarding plant'
      ],
      correctAnswer: 2,
      module: 'Legislation'
    },
    'final-risk': {
      type: 'multiple-choice',
      question: 'What is the purpose of a risk assessment?',
      options: [
        'To only identify hazards',
        'To identify hazards, assess risks, and implement control measures',
        'To only assess risks',
        'To only implement control measures'
      ],
      correctAnswer: 1,
      module: 'Risk Assessment'
    },
    'final-site': {
      type: 'multiple-choice',
      question: 'What should you do during site induction?',
      options: [
        'Only learn site rules',
        'Only learn emergency procedures',
        'Learn site rules, emergency procedures, and identify key personnel',
        'Only identify key personnel'
      ],
      correctAnswer: 2,
      module: 'Site Induction'
    },
    'final-preop': {
      type: 'multiple-choice',
      question: 'What is the purpose of pre-operational checks?',
      options: [
        'To only check the engine',
        'To only check the hydraulic system',
        'To only check the tracks',
        'To ensure the machine is safe and ready for operation'
      ],
      correctAnswer: 3,
      module: 'Pre-Operational Checks'
    },
    'final-travel': {
      type: 'multiple-choice',
      question: 'What should you check before site travel?',
      options: [
        'Only route safety',
        'Route safety, ground conditions, and overhead obstructions',
        'Only ground conditions',
        'Only overhead obstructions'
      ],
      correctAnswer: 1,
      module: 'Site Travel'
    },
    'final-confined': {
      type: 'multiple-choice',
      question: 'What is a confined area?',
      options: [
        'Any small area',
        'Only areas with limited access',
        'An area with limited access, restricted movement, or poor ventilation',
        'Only areas with poor ventilation'
      ],
      correctAnswer: 2,
      module: 'Confined Areas'
    },
    'final-quickhitch': {
      type: 'multiple-choice',
      question: 'What is a quick hitch system?',
      options: [
        'A system for quick engine start',
        'A system for quick fuel filling',
        'A system for quick maintenance',
        'A system that allows rapid attachment and detachment of buckets and tools'
      ],
      correctAnswer: 3,
      module: 'Quick Hitch'
    },
    'final-excavating': {
      type: 'multiple-choice',
      question: 'What is the correct digging technique?',
      options: [
        'Start from the bottom',
        'Start from the top, work in layers, and maintain proper depth',
        'Dig randomly',
        'Dig as deep as possible immediately'
      ],
      correctAnswer: 1,
      module: 'Excavating'
    },
    'final-services': {
      type: 'multiple-choice',
      question: 'What should you check when loading transporting vehicles?',
      options: [
        'Only vehicle stability',
        'Only load distribution',
        'Vehicle stability, load distribution, and securement',
        'Only securement'
      ],
      correctAnswer: 2,
      module: 'Loading Services'
    },
    'final-types': {
      type: 'multiple-choice',
      question: 'What are the main types of excavation?',
      options: [
        'Only trenching',
        'Only bulk excavation',
        'Trenching, bulk excavation, and foundation work',
        'Only foundation work'
      ],
      correctAnswer: 2,
      module: 'Excavation Types'
    },
    'final-trenching': {
      type: 'multiple-choice',
      question: 'What is the maximum depth for unsupported trenches?',
      options: [
        '2 meters',
        '3 meters',
        '1.2 meters (4 feet)',
        'No limit'
      ],
      correctAnswer: 2,
      module: 'Trenching'
    },
    'final-lifting': {
      type: 'multiple-choice',
      question: 'What should you check before lifting operations?',
      options: [
        'Only load weight',
        'Load weight, lifting capacity, and ground conditions',
        'Only lifting capacity',
        'Only ground conditions'
      ],
      correctAnswer: 1,
      module: 'Lifting Operations'
    },
    'final-environmental': {
      type: 'multiple-choice',
      question: 'What environmental considerations should you have?',
      options: [
        'Only minimize soil disturbance',
        'Only prevent contamination',
        'Minimize soil disturbance, prevent contamination, and protect wildlife',
        'Only protect wildlife'
      ],
      correctAnswer: 2,
      module: 'Environmental'
    },
    'final-transport': {
      type: 'multiple-choice',
      question: 'What should you check before transporting the excavator?',
      options: [
        'Only transport route',
        'Only vehicle capacity',
        'Transport route, vehicle capacity, and securing methods',
        'Only securing methods'
      ],
      correctAnswer: 2,
      module: 'Transportation'
    },
    'final-shutdown': {
      type: 'multiple-choice',
      question: 'What is the correct shutdown procedure?',
      options: [
        'Only lower attachments',
        'Only engage parking brake',
        'Lower attachments, engage parking brake, and turn off engine',
        'Only turn off engine'
      ],
      correctAnswer: 2,
      module: 'Shutdown'
    }
  };

  const trainingData = {
    dashboard: {
      title: 'Training Dashboard',
      icon: Home,
      content: 'dashboard'
    },
    introduction: {
      title: 'Introduction to 360 Excavator',
      icon: Book,
      content: {
        overview: 'A 360° excavator is a heavy construction machine that consists of a boom, dipper, bucket and cab on a rotating platform, placed on a wheeled or tracked undercarriage. These machines have vast applications in construction, from shifting materials to digging trenches and foundations.',
        objectives: [
          'Understand the relevant legislation relating to work activities',
          'Comply with the manufacturer\'s instructions, using the operator\'s handbook and other information sources',
          'Identify the hazards associated with plant or machinery operations and put the appropriate control measures in place',
          'Identify the machine components and operator controls',
          'Perform pre-shift and operational checks',
          'Prepare the excavator 360° for site travel',
          'Drive over various types of terrain',
          'Manoeuvre in confined areas',
          'Prepare the machine and bucket to excavate',
          'Demonstrate how to attach and remove different types of buckets and ancillaries safely',
          'Select the appropriate techniques to perform essential tasks',
          'Operate plant and machinery to excavate ground and loose materials to given work instructions',
          'Perform excavation activities in a variety of soil types',
          'Demonstrate how to place spoil into transporting vehicles safely',
          'Demonstrate how to grade, spread and level different types of material',
          'Explain the procedures for loading and unloading on and off a transporter',
          'Shut down machinery safely and secure it at the end of the operation'
        ],
        constructionSite: 'Construction sites are busy places and present many dangers. You will be taught how to act responsibly on site, identify common hazards, and operate your machine safely and efficiently.',
        safeWorking: 'Always put safety first and STOP any activity that could lead to harm to yourself or others. Always seek assistance and OperateSAFE.'
      }
    },
    legislation: {
      title: 'Health & Safety Legislation',
      icon: AlertTriangle,
      content: {
        overview: 'Understanding health and safety legislation is crucial for safe operation of plant machinery.',
        hseAct: {
          title: 'Health and Safety at Work Act 1974',
          description: 'Designed to protect people and the environment from workplace activities. It places certain duties and responsibilities on employers, employees, self-employed, designers and manufacturers.',
          employerDuties: [
            'Provide safe working conditions',
            'Ensure equipment is properly maintained',
            'Provide adequate training and supervision',
            'Conduct risk assessments'
          ],
          employeeDuties: [
            'Take reasonable care of themselves and others',
            'Co-operate with employer on health and safety',
            'Use equipment and safety devices properly'
          ]
        },
        puwer: {
          title: 'PUWER 98 Regulations',
          description: 'Provision & Use of Work Equipment Regulations 1998',
          scope: 'Work equipment is any machinery, appliance, apparatus, tool or installation for use at work',
          requirements: [
            'Equipment must be suitable for intended use',
            'Equipment must be maintained in safe condition',
            'Users must receive adequate information and training',
            'Equipment must have appropriate safety measures',
            'ROPS and FOPS must be in place for protection'
          ]
        },
        additionalLegislation: [
          'Management of Health and Safety at Work Regulations (MHSWR)',
          'Construction (Design and Management) Regulations (CDM)',
          'Vibration at Work Regulations',
          'Road Traffic Act',
          'Control of Substances Hazardous to Health Regulations',
          'The Control of Noise Regulations'
        ]
      }
    },
    riskAssessment: {
      title: 'Risk Assessment & Method Statements',
      icon: FileText,
      content: {
        overview: 'Risk assessment and method statements are essential for safe work practices.',
        riskAssessment: {
          title: 'Risk Assessment Process',
          steps: [
            'Identify what could cause injury or illness (hazards)',
            'Decide how likely it is that someone could be harmed and how seriously (the risk)',
            'Take action to eliminate the hazard, or if not possible, control the risk'
          ]
        },
        methodStatement: {
          title: 'Method Statements',
          purpose: 'Document specific instructions on how to SAFELY perform a work-related task. It is the plant operator\'s responsibility to COMPLY with the Method Statement.'
        },
        socialResponsibilities: {
          title: 'Social Responsibilities',
          points: [
            'Environmental protection',
            'Community safety',
            'Sustainable practices',
            'Noise and pollution control'
          ]
        }
      }
    },
    siteInduction: {
      title: 'Site Induction & Responsibilities',
      icon: User,
      content: {
        overview: 'Site induction covers essential safety topics and operator responsibilities.',
        siteInduction: {
          title: 'Site Induction Topics',
          topics: [
            'Access and egress',
            'Safety signs and signals',
            'Accident reporting',
            'Emergency procedures',
            'PPE/RPE requirements',
            'Welfare facilities',
            'Site layout and traffic routes',
            'Restricted/prohibited areas',
            'Confined spaces',
            'Buried services',
            'Lifting operations',
            'Working from/at height'
          ]
        },
        operatorResponsibilities: {
          title: 'Operator Roles & Responsibilities',
          requirements: [
            'Only use site plant if trained, competent and authorised',
            'Only authorised operators should hold vehicle keys',
            'Work safely, efficiently and comply with method statements',
            'Be punctual and co-operate with other workers',
            'Use operator\'s manual for the specific machine',
            'Understand layout and operation of controls',
            'Know stability limits and daily checks'
          ]
        }
      }
    },
    components: {
      title: 'Major Components',
      icon: Settings,
      content: {
        overview: 'Understanding the major components of the 360 excavator is essential for safe operation.',
        powerUnit: {
          title: 'Power Unit & Oils',
          safety: 'Always wear gloves when checking engine oil to prevent skin disease and contamination'
        },
        hydraulicSystem: {
          title: 'Hydraulic System',
          safety: 'Ensure filler cap area is clean and pressure is released before removing cap. Use clean container when filling'
        },
        fuelSystem: {
          title: 'Fuel System',
          safety: 'Fill up at end of shift to prevent condensation building up in tank'
        },
        coolingSystem: {
          title: 'Cooling System',
          safety: 'Cooling systems are pressurised - removing cap can allow hot water to escape causing SEVERE burns'
        },
        safetyFeatures: {
          title: 'Safety Features',
          rops: 'Roll Over Protective Structure - provides protection in event of overturn',
          fops: 'Falling Object Protective Structure - protects from falling materials. Hard hat not needed in FOPS cab',
          seatbelt: 'Must be worn even with cab door closed to keep operator within confines of operating seat'
        },
        otherComponents: {
          title: 'Other Components',
          items: [
            'Chassis/Track Assembly',
            'Electrical System',
            'Hydraulic Lockout Control (Deadman)',
            'Quick Hitch Coupler'
          ]
        }
      }
    },
    preOperational: {
      title: 'Pre-Operational Checks',
      icon: CheckCircle,
      content: {
        overview: 'Pre-operational checks are essential for safe machine operation.',
        itemsToCheck: [
          'Hydraulic oil system level',
          'Windscreen washer level',
          'Greasing',
          'Indicators and gauges',
          'Seat belt inspection',
          'Track adjustment',
          'Travel alarm (if fitted)',
          'Mirrors and windows'
        ],
        runningChecks: [
          'Hydraulic system - hydraulic lockout control',
          'Lights - flashing beacon',
          'Horn functionality',
          'Slew and movement of excavator',
          'Quick hitch operation',
          'Safety systems',
          'Re-fuelling procedures'
        ],
        ppe: [
          'Head protection',
          'Foot protection',
          'High-visibility clothing',
          'Weather-appropriate clothing',
          'Hearing protection',
          'Eye protection',
          'Gloves'
        ]
      }
    },
    siteTravel: {
      title: 'Site Travel & Maneuvering',
      icon: Play,
      content: {
        overview: 'Safe site travel and maneuvering techniques for 360 excavators.',
        gettingOnOff: {
          title: 'Safely Getting On and Off',
          procedures: [
            'Face the machine using specific steps and handrails',
            'Maintain 3 points of contact wherever possible',
            'Ensure steps and handrails are clean and clear of debris',
            'Ensure ground is firm and clear of obstructions before exiting cab',
            'Wear correct boots laced up fully'
          ]
        },
        siteTravel: {
          title: 'Preparing for Site Travel',
          checklist: [
            'Check controls are neutralised',
            'Adjust seat for comfort/reach',
            'Wear seatbelt - adjust as required',
            'Turn engine speed dial to operating range',
            'Move hydraulic lockout control to unlocked position',
            'Raise boom enough to provide ground clearance',
            'Select desired travel speed',
            'Drive sprockets should be to rear of machine'
          ]
        },
        visibilityAids: {
          title: 'Visibility Aids',
          requirements: 'Always ensure all mirrors/cameras are correctly fitted, unbroken, clean and correctly adjusted'
        },
        restrictedSpace: {
          title: 'Travel in Restricted Space',
          considerations: [
            'Static dimensions: overall height, length, tail-swing, track width',
            'Maintain minimum 0.5m clearance from obstructions',
            'Use height and slew restrictors where fitted',
            'Consider need for plant and vehicle marshaller',
            'Plan traffic routes to minimise congestion and collision risk'
          ]
        }
      }
    },
    confinedAreas: {
      title: 'Operating in Confined Areas',
      icon: AlertTriangle,
      content: {
        overview: 'Special considerations for operating in confined areas.',
        safetyInnovations: {
          title: 'Safety Innovations',
          humanDetection: {
            title: 'Human Detection Systems',
            spillard: 'Spillard Human Detection System identifies human form through deep intelligent mapping',
            safetyShield: 'Safety Shield AI Collision Avoidance Technology with HD cameras and LED alerts'
          }
        },
        considerations: {
          title: 'Key Considerations',
          points: [
            'Always ensure visibility around the machine',
            'Use visibility aids including LED lights and approach lighting',
            'Consider need for plant and vehicle marshaller',
            'Be aware of counterweight dangers in confined spaces',
            'Maintain safe distances from obstructions'
          ]
        }
      }
    },
    quickHitch: {
      title: 'Quick Hitch & Attachments',
      icon: Settings,
      content: {
        overview: 'Understanding quick hitch systems and bucket attachments.',
        bucketTypes: {
          title: 'Bucket Types',
          types: [
            'Digging buckets',
            'Trenching buckets',
            'Ditching buckets',
            'Grading buckets',
            'Trapezoidal buckets',
            '360° Rotating buckets'
          ]
        },
        quickHitchTypes: {
          title: 'Quick Hitch Classifications',
          manual: 'Manual Quick Hitch - operator must isolate controls, switch off machine, manually remove pins',
          semiAutomatic: 'Semi-Automatic Quick Hitch - hydraulic rams operated from cab, locking pin inserted manually',
          fullyAutomatic: 'Fully Automatic Quick Hitch - all functions from cab, hydraulic pressure applied to locking system'
        },
        preUseChecks: {
          title: 'Pre-Use Checks',
          checks: [
            'Check for damage of quick hitch coupler',
            'Check for any cracks',
            'Check hydraulic lines for damage or oil leaks',
            'Ensure all pins and clips are in place and secure',
            'Carry out visual and physical inspection after coupling'
          ]
        }
      }
    },
    excavating: {
      title: 'Excavating Duties',
      icon: FileText,
      content: {
        overview: 'Safe excavating techniques and procedures.',
        safetyChecks: {
          title: 'Safety Checks at Work Area',
          requirements: 'Prior to setting up for work, conduct safety checks to identify potential hazards'
        },
        setup: {
          title: 'Setting Up for Excavating',
          considerations: [
            'Establish exclusion zones with clear communication',
            'Make full observations prior to and whilst maneuvering',
            'Machine must be level',
            'Operator should slew to left whenever possible',
            'Avoid digging downhill where possible',
            'Adhere to all drawings and plans',
            'Ensure correct spoil placement'
          ]
        },
        loading: {
          title: 'Setting Up for Loading',
          requirements: [
            'Ensure vehicle is on level ground and secure',
            'Vehicle should be parked for minimal excavator movement',
            'Cut level platform for machine to stand on',
            'Use correct size and type of bucket',
            'For forward tipping dumpers - operator must be clear of machine before loading'
          ]
        }
      }
    },
    services: {
      title: 'Underground & Overhead Services',
      icon: AlertTriangle,
      content: {
        overview: 'Working safely near underground and overhead services.',
        overheadServices: {
          title: 'Overhead Services',
          guidance: 'All work near overhead lines must be properly planned and managed. Follow HSE publication "Avoiding danger from overhead power lines" (GS6)',
          requirements: 'Minimum distances determined by voltage and type of line'
        },
        undergroundServices: {
          title: 'Underground Services',
          guidance: 'Follow HSE publication "Avoiding danger from underground services" (HSG47)',
          colorCoding: {
            red: 'Electricity',
            black: 'Electricity',
            orange: 'Street lighting',
            yellow: 'Gas',
            green: 'Communications',
            blue: 'Water',
            grey: 'Telecommunications/Water'
          },
          identification: 'Methods include desktop studies, site investigation, physical identification, and marker tapes'
        }
      }
    },
    excavationTypes: {
      title: 'Types of Excavation',
      icon: FileText,
      content: {
        overview: 'Different types of excavation and their requirements.',
        materialTypes: {
          title: 'Material Types',
          types: [
            { name: 'Topsoil excavation', description: 'Removal of exposed layer' },
            { name: 'Earth excavation', description: 'Removal of layer beneath topsoil' },
            { name: 'Rock excavation', description: 'Removal requiring special methods' },
            { name: 'Muck excavation', description: 'Removal of excessively wet material' },
            { name: 'Unclassified excavation', description: 'Combination of above materials' }
          ]
        },
        purposeTypes: {
          title: 'Purpose Types',
          types: [
            { name: 'Cut and fill excavation', description: 'Material that is cut or stripped' },
            { name: 'Trench excavation', description: 'Length greatly exceeds depth' },
            { name: 'Footing excavation', description: 'Used to form strip foundations' },
            { name: 'Basement excavation', description: 'Part of building below ground level' },
            { name: 'Road excavation', description: 'Stripping topsoil, cut and fill' },
            { name: 'Bridge excavation', description: 'Footing and abutments of bridges' }
          ]
        },
        supportTypes: {
          title: 'Excavation Support',
          types: [
            'Timber Support',
            'Trench Boxes',
            'Trench Sheets',
            'Caissons',
            'Cofferdams'
          ],
          instability: 'Excavations may become unstable due to vibration, weather conditions, loads near edges, or failure of support systems'
        }
      }
    },
    trenching: {
      title: 'Trenching Techniques',
      icon: FileText,
      content: {
        overview: 'Specialized trenching techniques and safety considerations.',
        techniques: [
          'Always start at top and work in layers - reduces cycle and makes process easier',
          'Begin at edge of trench',
          'Ensure excavator is facing work area - avoid digging over side where possible',
          'Always work within machine\'s digging envelope for efficiency and full bucket loads'
        ],
        backfill: {
          title: 'Backfill and Compaction',
          requirements: 'Backfill and sub-base layers critical to reinstatement performance. Materials must be assessed before use and laid in stages for proper compaction'
        }
      }
    },
    lifting: {
      title: 'Lifting with Excavators',
      icon: Award,
      content: {
        overview: 'Safe lifting operations with excavators.',
        capacityChart: {
          title: 'Reading Lifting Capacity Charts',
          factors: [
            'Dipper arm length - longer arms reduce lifting capacity',
            'Reach - found across top of chart, never exceed for each weight',
            'Height/depth - found down left side, 0m is ground level',
            'Weight/SWL - safe working load must never be exceeded',
            'Machine configuration - in line with tracks is most stable'
          ]
        },
        requirements: {
          title: 'Machine Requirements',
          lessThan1Tonne: [
            'Load chart',
            'Lifting eye'
          ],
          greaterThan1Tonne: [
            'Load chart',
            'Lifting eye',
            'Overload warning device',
            'Check values',
            'RCI (Rate Capacity Indicator)'
          ]
        },
        procedures: {
          title: 'Lifting Procedures',
          requirements: [
            'Ensure lift plan or method statement in place',
            'Disengage hydraulics before slinger approaches',
            'Communicate with slinger/signaller on signals',
            'Ensure all lifts are fully controlled with smooth operations',
            'Stop if overload warning sounds and reduce load radius',
            'Ensure ground is level and firm'
          ]
        }
      }
    },
    environmental: {
      title: 'Environmental Considerations',
      icon: Award,
      content: {
        overview: 'Minimizing environmental impact during operations.',
        pollutionTypes: [
          'Air pollution',
          'Water pollution',
          'Noise pollution'
        ],
        prevention: [
          'Lower engine speeds where possible',
          'Ensure no spillage of fluids',
          'Keep machine well maintained',
          'Ensure prior planning of work task'
        ]
      }
    },
    transportation: {
      title: 'Loading/Unloading Procedures',
      icon: Award,
      content: {
        overview: 'Safe loading and unloading procedures for transport.',
        preLoading: {
          title: 'Pre-Loading Checks',
          checks: [
            'Ground support',
            'Ramp condition',
            'Overhead and other hazards',
            'Positioning on trailer',
            'Direction of travel'
          ]
        },
        loadingProcess: {
          title: 'Loading Process',
          steps: [
            'Remove dirt or debris from trailer',
            'Check parking brake',
            'Check trailer bodywork for damage',
            'Position loading ramps securely',
            'Align machine with loading ramps',
            'Track forward onto ramps slowly',
            'Lower bucket onto transporter',
            'Stop engine and secure machine'
          ]
        },
        exclusionZone: {
          title: 'Exclusion Zone',
          requirements: [
            'Always clear of personnel',
            'Minimum clearance of machine height',
            'Risk assessment for restricted space sites'
          ]
        }
      }
    },
    shutdown: {
      title: 'End of Work & Shutdown',
      icon: Award,
      content: {
        overview: 'Proper shutdown procedures and parking considerations.',
        procedures: {
          title: 'Shutdown Procedures',
          steps: [
            'Follow full shutdown procedure when parking',
            'Lower bucket/attachment',
            'Switch off engine',
            'Remove key and secure machine',
            'Carry out final safety checks'
          ]
        },
        parking: {
          title: 'Parking Considerations',
          avoid: [
            'Site roads',
            'Pedestrian routes',
            'Soft/wet/steep ground',
            'Blocking access/egress routes from buildings'
          ]
        }
      }
    },
    resources: {
      title: 'Training Resources',
      icon: FileText,
      content: {
        overview: 'Additional resources and reference materials for 360 excavator training.',
        manuals: {
          title: 'Operator Manuals',
          importance: 'Always refer to the specific machine\'s operator manual for detailed procedures and specifications'
        },
        qrCodes: {
          title: 'QR Code Resources',
          description: 'Scan QR codes throughout the workbook for additional content including videos and reading materials'
        },
        operateSafe: {
          title: 'OperateSAFE Campaign',
          description: 'Company-wide Health & Safety campaign championed by Flannery Plant Hire. Familiarize yourself with internal and external health and safety campaigns when starting at new jobs.'
        },
        literacyNumeracy: {
          title: 'Literacy, Numeracy & ICT',
          requirements: [
            'Extract information from operator manuals',
            'Conduct simple calculations of bucket capacities',
            'Read digital screens in the cab',
            'Use training simulators effectively'
          ]
        }
      }
    }
  };

  const knowledgeChecks = [
    { id: 'intro-1', question: 'What is a 360 Excavator?', section: 'introduction', type: 'multiple-choice' },
    { id: 'intro-2', question: 'List 4 main hazards commonly found on construction sites:', section: 'introduction', type: 'multiple-choice' },
    { id: 'intro-3', question: 'List 5 effects of hazards:', section: 'introduction', type: 'multiple-choice' },
    { id: 'legislation-1', question: 'What does the Health & Safety at Work etc. Act 1974 require employers to do, specifically regarding plant?', section: 'legislation', type: 'multiple-choice' },
    { id: 'legislation-2', question: 'List the 3 main duties placed on employees under the Health and Safety at Work act 1974:', section: 'legislation', type: 'multiple-choice' },
    { id: 'components-1', question: 'Why must gloves always be worn when checking engine oil level?', section: 'components', type: 'multiple-choice' },
    { id: 'components-2', question: 'If an operator has to top-up the hydraulic oil, state two precautions that ensure cleanliness of the system:', section: 'components', type: 'multiple-choice' }
  ];

  const navigationItems = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'training', label: 'Training', icon: Book },
    { key: 'resources', label: 'Resources', icon: FileText },
    { key: 'profile', label: 'Profile', icon: User }
  ];

  // Validation function
  const validateAnswer = (questionId, userAnswer) => {
    const correctAnswer = correctAnswers[questionId];
    if (!correctAnswer) return { isCorrect: false, feedback: 'Question not found' };

    if (correctAnswer.type === 'multiple-choice') {
      const isCorrect = userAnswer === correctAnswer.correctAnswer.toString();
      return {
        isCorrect,
        feedback: isCorrect ? 'Correct!' : 'Incorrect. Please review the material and try again.',
        correctAnswer: correctAnswer.options[correctAnswer.correctAnswer]
      };
    }

    return { isCorrect: false, feedback: 'Invalid question type' };
  };

  const handleSubmitAnswer = (questionId) => {
    const userAnswer = knowledgeAnswers[questionId];
    if (!userAnswer) return;

    const result = validateAnswer(questionId, userAnswer);
    
    setSubmittedAnswers(prev => ({ ...prev, [questionId]: true }));
    setAnswerFeedback(prev => ({ ...prev, [questionId]: result }));
    
    // Update knowledge progress
    setKnowledgeProgress(prev => ({
      ...prev,
      [questionId]: result.isCorrect ? 'correct' : 'incorrect'
    }));
  };

  const handleResetAnswer = (questionId) => {
    setKnowledgeAnswers(prev => ({ ...prev, [questionId]: '' }));
    setSubmittedAnswers(prev => ({ ...prev, [questionId]: false }));
    setAnswerFeedback(prev => ({ ...prev, [questionId]: null }));
    setKnowledgeProgress(prev => ({ ...prev, [questionId]: null }));
  };

  // Final Test Functions
  const validateFinalTestAnswer = (questionId, userAnswer) => {
    const correctAnswer = finalTestQuestions[questionId];
    if (!correctAnswer) return { isCorrect: false, feedback: 'Question not found' };

    if (correctAnswer.type === 'multiple-choice') {
      const isCorrect = userAnswer === correctAnswer.correctAnswer.toString();
      return {
        isCorrect,
        feedback: isCorrect ? 'Correct!' : 'Incorrect. Please review the material and try again.',
        correctAnswer: correctAnswer.options[correctAnswer.correctAnswer]
      };
    }

    return { isCorrect: false, feedback: 'Invalid question type' };
  };

  const handleSubmitFinalTest = () => {
    console.log('Final test submission started');
    console.log('Current finalTestAnswers:', finalTestAnswers);
    
    const totalQuestions = Object.keys(finalTestQuestions).length;
    let correctAnswers = 0;
    const results = {};

    console.log('Total questions:', totalQuestions);

    Object.keys(finalTestQuestions).forEach(questionId => {
      const userAnswer = finalTestAnswers[questionId] || '';
      console.log(`Question ${questionId}:`, userAnswer);
      const validation = validateFinalTestAnswer(questionId, userAnswer);
      results[questionId] = validation;
      
      if (validation.isCorrect) {
        correctAnswers++;
      }
    });

    const percentage = (correctAnswers / totalQuestions) * 100;
    const passed = percentage >= 80;

    console.log('Final results:', { correctAnswers, totalQuestions, percentage, passed });

    setFinalTestScore({
      correct: correctAnswers,
      total: totalQuestions,
      percentage: percentage,
      passed: passed,
      results: results
    });
    setFinalTestSubmitted(true);
    
    console.log('Final test submission completed');
  };

  const handleResetFinalTest = () => {
    setFinalTestAnswers({});
    setFinalTestSubmitted(false);
    setFinalTestScore(null);
  };

  // Time Tracking Functions
  const startSectionTimer = (sectionId) => {
    setActiveSectionStartTime(Date.now());
  };

  const stopSectionTimer = () => {
    if (activeSectionStartTime) {
      const timeSpent = Date.now() - activeSectionStartTime;
      setSectionTimeTracking(prev => ({
        ...prev,
        [activeSection]: (prev[activeSection] || 0) + timeSpent
      }));
      setActiveSectionStartTime(null);
    }
  };

  const startLearningTimer = () => {
    setActiveSectionStartTime(Date.now());
  };

  const stopLearningTimer = () => {
    if (activeSectionStartTime) {
      const timeSpent = Date.now() - activeSectionStartTime;
      setSectionTimeTracking(prev => ({
        ...prev,
        [activeSection]: (prev[activeSection] || 0) + timeSpent
      }));
      setTotalLearningTime(prev => prev + timeSpent);
      setActiveSectionStartTime(null);
    }
  };

  const isTrainingModule = (section) => {
    const trainingModules = [
      'introduction', 'legislation', 'risk-assessment', 'ppe', 'site-safety',
      'machine-components', 'pre-shift-checks', 'site-travel', 'attachments',
      'excavation-techniques', 'loading-operations', 'grading-leveling',
      'transport-loading', 'shutdown-procedures', 'emergency-procedures'
    ];
    return trainingModules.includes(section);
  };

  const isActivelyLearning = (section) => {
    return isTrainingModule(section) && activeSection === section;
  };

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const getTotalLearningTime = () => {
    // Only count time spent in training modules
    if (!sectionTimeTracking || typeof sectionTimeTracking !== 'object') {
      return 0;
    }
    const trainingTime = Object.values(sectionTimeTracking).reduce((total, time) => total + (time || 0), 0);
    return trainingTime;
  };

  // Time tracking effect - only for actual learning time
  useEffect(() => {
    const interval = setInterval(() => {
      if (isActivelyLearning(activeSection)) {
        setCurrentSessionTime(Date.now() - sessionStartTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime, activeSection]); // Add proper dependencies

  // Section change tracking - only for training modules
  useEffect(() => {
    if (isActivelyLearning(activeSection)) {
      startLearningTimer();
    } else {
      stopLearningTimer();
    }
  }, [activeSection]); // Add activeSection as dependency

  // Add some sample progress data for demonstration
  useEffect(() => {
    // Simple initialization without complex object operations
    setCompletedSections(new Set(['introduction', 'legislation', 'risk-assessment']));
    setKnowledgeProgress({
      'intro-1': 'correct',
      'intro-2': 'correct',
      'intro-3': 'correct',
      'legislation-1': 'correct',
      'legislation-2': 'incorrect',
      'components-1': 'correct',
      'components-2': 'correct'
    });
    setSectionTimeTracking({
      'introduction': 1800000,
      'legislation': 1200000,
      'risk-assessment': 900000,
      'ppe': 600000,
      'site-safety': 1500000
    });
    setTotalLearningTime(6000000);
  }, []);

  const DashboardContent = () => (
    <div className="space-y-4 max-w-full">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg max-w-full">
          <div className="flex items-center justify-center mb-4">
            <FlanneryLogo />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-center">Skills Bootcamp</h1>
          <p className="text-lg text-center">360 Excavator Training</p>
          <div className="mt-4 text-center">
            <p className="text-sm opacity-90">📸 Images and diagrams will be added to enhance learning</p>
          </div>
        </div>

      <div className="grid grid-cols-1 gap-4 max-w-full">
        <div className="bg-white p-4 rounded-lg shadow border max-w-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Progress</h3>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span>Modules Completed</span>
                <span className="font-semibold">{completedSections.size}/15</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all"
                  style={{ width: `${(completedSections.size / 15) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm">
                <span>Knowledge Checks</span>
                <span className="font-semibold">
                  {Object.values(knowledgeProgress).filter(status => status === 'correct').length}/{knowledgeChecks.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ 
                    width: `${knowledgeChecks.length > 0 ? (Object.values(knowledgeProgress).filter(status => status === 'correct').length / knowledgeChecks.length) * 100 : 0}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border max-w-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Safety Focus</h3>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-gray-600 text-sm">Always remember to OperateSAFE - your safety and that of others is paramount.</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border max-w-full">
          <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={() => setActiveSection('training')}
              className="w-full text-left text-blue-600 hover:text-blue-800 text-sm py-2"
            >
              Take Knowledge Check
            </button>
            <button 
              onClick={() => setActiveSection('legislation')}
              className="w-full text-left text-blue-600 hover:text-blue-800 text-sm py-2"
            >
              Review Safety Guidelines
            </button>
            <button 
              onClick={() => {
                // Bookmark current section functionality
                const currentSection = activeSection;
                if (currentSection && currentSection !== 'dashboard') {
                  // In a real app, this would save to localStorage or backend
                  alert(`Section "${trainingData[currentSection]?.title || currentSection}" has been bookmarked!`);
                } else {
                  alert('Please select a training section to bookmark.');
                }
              }}
              className="w-full text-left text-blue-600 hover:text-blue-800 text-sm py-2"
            >
              Bookmark Section
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow border max-w-full">
        <h3 className="text-lg font-semibold mb-3">Training Objectives</h3>
        <div className="space-y-2">
          {trainingData.introduction.content.objectives.slice(0, showAllObjectives ? undefined : 6).map((objective, index) => (
            <div key={index} className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{objective}</span>
            </div>
          ))}
          <button 
            onClick={() => setShowAllObjectives(!showAllObjectives)}
            className="text-orange-600 text-sm font-medium mt-2 hover:text-orange-700"
          >
            {showAllObjectives ? 'Show Less' : `View All ${trainingData.introduction.content.objectives.length} Objectives`} →
          </button>
        </div>
      </div>
    </div>
  );

  const TrainingContent = () => (
    <div className="space-y-4 max-w-full">
      <div className="flex items-center justify-between mb-4 max-w-full">
        <h1 className="text-xl font-bold text-gray-900">Training Modules</h1>
        <button 
          onClick={() => setShowSearch(!showSearch)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      {showSearch && (
        <div className="mb-4 max-w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search training content..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {showFinalTest ? (
        <FinalTest />
      ) : (
        <>
          <div className="space-y-3 max-w-full">
            {Object.entries(trainingData).filter(([key]) => key !== 'dashboard').map(([key, section]) => {
              const Icon = section.icon;
              const isCompleted = completedSections.has(key);
              
              return (
                <div key={key} className="bg-white rounded-lg shadow border overflow-hidden max-w-full">
                  <button
                    onClick={() => setActiveSection(key)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{section.title}</h3>
                        <p className="text-sm text-gray-500">Training module</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Final Test Section */}
          <div className="mt-6 bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow border overflow-hidden max-w-full">
            <div className="p-4 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Final Assessment</h3>
                  <p className="text-sm text-red-100">Comprehensive test covering all modules</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-red-100 mb-2">
                  Test your knowledge across all 15 training modules with our comprehensive final assessment.
                </p>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <p className="text-sm text-white">
                    <strong>Requirements:</strong> 80% pass mark (12 out of 15 questions)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowFinalTest(true)}
                className="w-full bg-white text-red-600 px-4 py-3 rounded-lg hover:bg-red-50 text-sm font-medium transition-colors"
              >
                Start Final Test
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const ProgressContent = () => {
    // Safety checks for all variables
    const completedSectionsCount = completedSections ? completedSections.size : 0;
    const totalSections = 15;
    const passedKnowledgeChecks = knowledgeProgress ? Object.values(knowledgeProgress).filter(status => status === 'correct').length : 0;
    const totalKnowledgeChecks = knowledgeChecks ? knowledgeChecks.length : 0;
    const knowledgeProgressPercentage = totalKnowledgeChecks > 0 ? (passedKnowledgeChecks / totalKnowledgeChecks) * 100 : 0;
    const sectionProgressPercentage = (completedSectionsCount / totalSections) * 100;
    
    // Calculate overall progress
    const sectionProgress = (completedSectionsCount / totalSections) * 0.4;
    const knowledgeProgress = totalKnowledgeChecks > 0 ? (passedKnowledgeChecks / totalKnowledgeChecks) * 0.4 : 0;
    const finalTestProgress = finalTestScore && finalTestScore.passed ? 0.2 : 0;
    const overallProgress = (sectionProgress + knowledgeProgress + finalTestProgress) * 100;

    console.log('Progress Debug:', {
      completedSectionsCount,
      passedKnowledgeChecks,
      totalKnowledgeChecks,
      knowledgeProgressPercentage,
      sectionProgressPercentage,
      overallProgress
    });

    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h1>
        
        {/* Debug Info */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold mb-2 text-yellow-800">Debug Information</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>Completed Sections: {completedSectionsCount}</p>
            <p>Knowledge Checks Passed: {passedKnowledgeChecks}/{totalKnowledgeChecks}</p>
            <p>Total Learning Time: {formatTime(getTotalLearningTime())}</p>
            <p>Active Section: {activeSection}</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3">Overall Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Completed Sections</span>
                <span className="font-semibold">{completedSectionsCount}/{totalSections}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-orange-500 h-3 rounded-full transition-all"
                  style={{ width: `${sectionProgressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Knowledge Checks Passed</span>
                <span className="font-semibold">{passedKnowledgeChecks}/{totalKnowledgeChecks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${knowledgeProgressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Final Assessment</span>
                <span className="font-semibold">
                  {finalTestScore ? (finalTestScore.passed ? 'PASSED' : 'FAILED') : 'Not Attempted'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all ${
                    finalTestScore 
                      ? (finalTestScore.passed ? 'bg-green-500' : 'bg-red-500')
                      : 'bg-gray-300'
                  }`}
                  style={{ 
                    width: finalTestScore ? '100%' : '0%'
                  }}
                ></div>
              </div>
              {finalTestScore && (
                <p className="text-xs text-gray-500 mt-1">
                  Score: {finalTestScore.correct}/{finalTestScore.total} ({finalTestScore.percentage.toFixed(1)}%)
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Overall Training Progress</span>
                <span className="font-semibold">{Math.round(overallProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {finalTestScore && (
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  finalTestScore.passed ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {finalTestScore.passed ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XIcon className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {finalTestScore.passed ? 'Passed Final Assessment' : 'Failed Final Assessment'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Score: {finalTestScore.correct}/{finalTestScore.total} ({finalTestScore.percentage.toFixed(1)}%)
                  </p>
                </div>
              </div>
            )}
            
            {completedSectionsCount > 0 ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Completed {completedSectionsCount} Training Modules</p>
                  <p className="text-xs text-gray-500">Latest: {Array.from(completedSections).pop()}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Book className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">No modules completed yet</p>
                  <p className="text-xs text-gray-500">Start your training journey!</p>
                </div>
              </div>
            )}
            
            {passedKnowledgeChecks > 0 ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Book className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Passed {passedKnowledgeChecks} Knowledge Checks</p>
                  <p className="text-xs text-gray-500">Success rate: {Math.round(knowledgeProgressPercentage)}%</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Book className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">No knowledge checks completed</p>
                  <p className="text-xs text-gray-500">Take your first knowledge check!</p>
                </div>
              </div>
            )}
            
            {getTotalLearningTime() > 0 ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Total Learning Time</p>
                  <p className="text-xs text-gray-500">{formatTime(getTotalLearningTime())}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">No learning time recorded</p>
                  <p className="text-xs text-gray-500">Start learning to track your time!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Time Tracking Analytics */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3">Learning Analytics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Total Learning Time</span>
                <span className="font-semibold">{formatTime(getTotalLearningTime())}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Learning Status</span>
                <span className={`font-semibold ${isActivelyLearning(activeSection) ? 'text-green-600' : 'text-gray-500'}`}>
                  {isActivelyLearning(activeSection) ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Modules Completed</span>
                <span className="font-semibold">{Object.keys(completedSections).length}/15</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Average Time per Module</span>
                <span className="font-semibold">
                  {Object.keys(completedSections).length > 0 
                    ? formatTime(getTotalLearningTime() / Math.max(1, Object.keys(completedSections).length))
                    : '0s'
                  }
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Time Spent by Module</h4>
              <div className="space-y-2">
                {Object.entries(trainingData).filter(([key]) => isTrainingModule(key)).map(([key, section]) => {
                  const timeSpent = sectionTimeTracking[key] || 0;
                  const isCompleted = completedSections.has(key);
                  const isActive = activeSection === key;
                  
                  return (
                    <div key={key} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600">{section.title}</span>
                        {isActive && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
                        {isCompleted && <CheckCircle className="h-3 w-3 text-green-600" />}
                      </div>
                      <span className="text-xs font-medium">{formatTime(timeSpent)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions for Demo */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={() => setActiveSection('training')}
              className="w-full text-left text-blue-600 hover:text-blue-800 text-sm py-2"
            >
              View Training Modules
            </button>
            <button 
              onClick={() => setActiveSection('introduction')}
              className="w-full text-left text-green-600 hover:text-green-800 text-sm py-2"
            >
              Complete Introduction Module
            </button>
            <button 
              onClick={() => setActiveSection('legislation')}
              className="w-full text-left text-green-600 hover:text-green-800 text-sm py-2"
            >
              Complete Legislation Module
            </button>
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Visit training modules to automatically track progress
            </p>
          </div>
        </div>
      </div>
    );
  };

  const ProfileContent = () => (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Profile</h1>
      
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold">John Smith</h3>
            <p className="text-sm text-gray-500">Excavator Operator</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Experience</span>
            <span className="text-sm font-medium">5 years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Learning Time</span>
            <span className="text-sm font-medium">{formatTime(getTotalLearningTime())}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Active Learning</span>
            <span className="text-sm font-medium">
              {isActivelyLearning(activeSection) ? 'In Progress' : 'Not Active'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Certifications</span>
            <span className="text-sm font-medium">3</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-3">Settings</h3>
        <div className="space-y-3">
          <button className="w-full text-left py-2 hover:bg-gray-50 rounded">
            <div className="flex items-center justify-between">
              <span className="text-sm">Notifications</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </button>
          <button className="w-full text-left py-2 hover:bg-gray-50 rounded">
            <div className="flex items-center justify-between">
              <span className="text-sm">Privacy</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </button>
          <button 
            onClick={() => setActiveSection('help-support')}
            className="w-full text-left py-2 hover:bg-gray-50 rounded"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">Help & Support</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const HelpSupportContent = () => (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Help & Support</h1>
      
      {/* Contact Information */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <span>Contact Information</span>
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Phone className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Phone Support</p>
              <p className="text-sm text-gray-600">0800 123 4567</p>
              <p className="text-xs text-gray-500">Mon-Fri 8am-6pm</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Email Support</p>
              <p className="text-sm text-gray-600">support@flannery.com</p>
              <p className="text-xs text-gray-500">Response within 24 hours</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Live Chat</p>
              <p className="text-sm text-gray-600">Available on website</p>
              <p className="text-xs text-gray-500">Instant support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Resources */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
            <Globe className="h-4 w-4 text-purple-600" />
          </div>
          <span>Official Resources</span>
        </h3>
        <div className="space-y-3">
          <a 
            href="https://www.citb.co.uk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">CITB - Construction Industry Training Board</p>
                <p className="text-xs text-gray-600">Official training standards and qualifications</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          </a>
          
          <a 
            href="https://www.hse.gov.uk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">HSE - Health and Safety Executive</p>
                <p className="text-xs text-gray-600">Safety guidelines and regulations</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          </a>
          
          <a 
            href="https://www.citb.co.uk/courses-and-qualifications/plant-operator-cards/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">CITB Plant Operator Cards</p>
                <p className="text-xs text-gray-600">CPCS and NPORS card information</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          </a>
          
          <a 
            href="https://www.citb.co.uk/courses-and-qualifications/training-standards/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">CITB Training Standards</p>
                <p className="text-xs text-gray-600">Industry training standards and requirements</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          </a>
        </div>
      </div>

      {/* Training Support */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-green-600" />
          </div>
          <span>Training Support</span>
        </h3>
        <div className="space-y-3">
          <button 
            onClick={() => setActiveSection('training')}
            className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Training Modules</p>
                <p className="text-xs text-gray-600">Access all training content</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </button>
          
          <button 
            onClick={() => {
              setActiveSection('training');
              setShowFinalTest(true);
            }}
            className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Final Assessment</p>
                <p className="text-xs text-gray-600">Take the comprehensive final test</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </button>
          
          <button 
            onClick={() => setActiveSection('progress')}
            className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Progress Tracking</p>
                <p className="text-xs text-gray-600">View your training progress</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
          <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
            <HelpCircle className="h-4 w-4 text-yellow-600" />
          </div>
          <span>Frequently Asked Questions</span>
        </h3>
        <div className="space-y-3">
          <div className="border-b border-gray-200 pb-3">
            <p className="text-sm font-medium mb-1">How do I get my CPCS card?</p>
            <p className="text-xs text-gray-600">Contact CITB directly or visit their website for card application procedures and requirements.</p>
          </div>
          
          <div className="border-b border-gray-200 pb-3">
            <p className="text-sm font-medium mb-1">What training standards apply?</p>
            <p className="text-xs text-gray-600">CITB sets the training standards for plant operations. Check their website for current requirements.</p>
          </div>
          
          <div className="border-b border-gray-200 pb-3">
            <p className="text-sm font-medium mb-1">How long is training valid?</p>
            <p className="text-xs text-gray-600">Training certificates typically last 2-5 years depending on the qualification type.</p>
          </div>
          
          <div className="pb-3">
            <p className="text-sm font-medium mb-1">Where can I find safety guidelines?</p>
            <p className="text-xs text-gray-600">HSE website provides comprehensive safety guidelines for construction and plant operations.</p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h3 className="text-lg font-semibold mb-3 text-red-800 flex items-center space-x-2">
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </div>
          <span>Emergency Contacts</span>
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-red-800">Emergency Services:</span>
            <span className="font-medium">999</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-800">HSE Incident Line:</span>
            <span className="font-medium">0345 300 9923</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-800">CITB Helpline:</span>
            <span className="font-medium">0344 994 4010</span>
          </div>
        </div>
      </div>
    </div>
  );

  const KnowledgeCheck = ({ check }) => {
    const isSubmitted = submittedAnswers[check.id];
    const feedback = answerFeedback[check.id];
    const isCorrect = feedback?.isCorrect;
    const userAnswer = knowledgeAnswers[check.id] || '';
    const correctAnswer = correctAnswers[check.id];

    return (
      <div className="bg-white p-4 rounded-lg shadow border mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <Book className="h-4 w-4 text-blue-600" />
          </div>
          <h4 className="font-semibold text-blue-900">KNOWLEDGE STOP</h4>
        </div>
        
        <p className="text-gray-800 mb-4 text-sm leading-relaxed">{correctAnswer.question}</p>
        
        {isSubmitted ? (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-xs text-gray-600 mb-2 font-medium">Your Answer:</p>
              <p className="text-sm text-gray-800 leading-relaxed">
                {userAnswer ? correctAnswer.options[parseInt(userAnswer)] : 'No answer provided'}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              isCorrect 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center space-x-2 mb-3">
                {isCorrect ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <XIcon className="h-5 w-5 text-red-600" />
                )}
                <span className="font-medium text-sm">
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{feedback?.feedback}</p>
              
              {!isCorrect && feedback?.correctAnswer && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2 font-medium">Correct answer:</p>
                  <p className="text-sm font-medium leading-relaxed">{feedback.correctAnswer}</p>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => handleResetAnswer(check.id)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 text-sm font-medium transition-colors"
              >
                Try Again
              </button>
              {!isCorrect && (
                <button 
                  onClick={() => {
                    setKnowledgeAnswers(prev => ({ ...prev, [check.id]: correctAnswer.correctAnswer.toString() }));
                    setSubmittedAnswers(prev => ({ ...prev, [check.id]: false }));
                    setAnswerFeedback(prev => ({ ...prev, [check.id]: null }));
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                  Use Correct Answer
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              {correctAnswer.type === 'multiple-choice' && (
                <div className="space-y-3">
                  {correctAnswer.options.map((option, index) => (
                    <label 
                      key={index} 
                      className={`flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                        userAnswer === index.toString() 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${check.id}`}
                        value={index}
                        checked={userAnswer === index.toString()}
                        onChange={() => setKnowledgeAnswers(prev => ({ ...prev, [check.id]: index.toString() }))}
                        className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 flex-shrink-0"
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => handleSubmitAnswer(check.id)}
                disabled={!userAnswer}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  userAnswer 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
              
              {userAnswer && (
                <button 
                  onClick={() => handleResetAnswer(check.id)}
                  className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const FinalTest = () => {
    const allQuestionsAnswered = Object.keys(finalTestQuestions).every(
      questionId => finalTestAnswers[questionId] !== undefined && finalTestAnswers[questionId] !== ''
    );

    return (
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <Award className="h-4 w-4 text-red-600" />
            </div>
            <h4 className="font-semibold text-red-900">FINAL ASSESSMENT</h4>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Comprehensive Final Test</h3>
            <p className="text-sm text-gray-600 mb-3">
              This test contains one question from each of the 15 training modules. 
              You must score 80% or higher to pass.
            </p>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Pass Mark:</strong> 80% (12 out of 15 questions correct)
              </p>
            </div>
          </div>

          {!finalTestSubmitted ? (
            <div className="space-y-4">
              {Object.entries(finalTestQuestions).map(([questionId, question]) => (
                <div key={questionId} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">
                        {Object.keys(finalTestQuestions).indexOf(questionId) + 1}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {question.module}
                    </span>
                  </div>
                  
                  <p className="text-gray-800 mb-4 text-sm leading-relaxed font-medium">
                    {question.question}
                  </p>
                  
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <label 
                        key={index} 
                        className={`flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-white ${
                          finalTestAnswers[questionId] === index.toString() 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`final-${questionId}`}
                          value={index}
                          checked={finalTestAnswers[questionId] === index.toString()}
                          onChange={() => setFinalTestAnswers(prev => ({ ...prev, [questionId]: index.toString() }))}
                          className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => {
                    console.log('Submit button clicked!');
                    console.log('allQuestionsAnswered:', allQuestionsAnswered);
                    console.log('finalTestAnswers:', finalTestAnswers);
                    handleSubmitFinalTest();
                  }}
                  disabled={!allQuestionsAnswered}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    allQuestionsAnswered 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit Final Test
                </button>
                
                {Object.keys(finalTestAnswers).length > 0 && (
                  <button 
                    onClick={handleResetFinalTest}
                    className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
                  >
                    Reset Test
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Test Results */}
              <div className={`p-4 rounded-lg border ${
                finalTestScore.passed 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex items-center space-x-2 mb-3">
                  {finalTestScore.passed ? (
                    <Check className="h-6 w-6 text-green-600" />
                  ) : (
                    <XIcon className="h-6 w-6 text-red-600" />
                  )}
                  <span className="font-bold text-lg">
                    {finalTestScore.passed ? 'PASSED!' : 'FAILED'}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Score:</strong> {finalTestScore.correct} out of {finalTestScore.total} ({finalTestScore.percentage.toFixed(1)}%)
                  </p>
                  <p className="text-sm">
                    <strong>Pass Mark:</strong> 80% (12 out of 15)
                  </p>
                  {finalTestScore.passed ? (
                    <p className="text-sm font-medium">
                      Congratulations! You have successfully completed the 360 Excavator Training Program.
                    </p>
                  ) : (
                    <p className="text-sm font-medium">
                      You need to review the material and retake the test to achieve the required 80% pass mark.
                    </p>
                  )}
                </div>
              </div>

              {/* Detailed Results */}
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-3">Detailed Results</h4>
                <div className="space-y-3">
                  {Object.entries(finalTestQuestions).map(([questionId, question]) => {
                    const result = finalTestScore.results[questionId];
                    const userAnswer = finalTestAnswers[questionId];
                    
                    return (
                      <div key={questionId} className={`p-3 rounded-lg border ${
                        result.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          {result.isCorrect ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <XIcon className="h-4 w-4 text-red-600" />
                          )}
                          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            {question.module}
                          </span>
                        </div>
                        
                        <p className="text-sm font-medium mb-2">{question.question}</p>
                        
                        <div className="text-xs space-y-1">
                          <p><strong>Your Answer:</strong> {userAnswer ? question.options[parseInt(userAnswer)] : 'No answer'}</p>
                          {!result.isCorrect && (
                            <p><strong>Correct Answer:</strong> {result.correctAnswer}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 p-4 rounded-lg border">
                <h4 className="font-semibold mb-3 text-blue-900">Recommendations</h4>
                {finalTestScore.passed ? (
                  <div className="space-y-2 text-sm text-blue-800">
                    <p>✅ <strong>Excellent work!</strong> You have demonstrated comprehensive knowledge of 360 excavator operations.</p>
                    <p>📚 <strong>Next Steps:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Review any areas where you scored lower</li>
                      <li>Practice practical skills in a controlled environment</li>
                      <li>Stay updated with safety regulations and best practices</li>
                      <li>Consider advanced training modules for specialized operations</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm text-blue-800">
                    <p>📚 <strong>Areas for Improvement:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Review modules where you answered incorrectly</li>
                      <li>Focus on safety procedures and risk assessment</li>
                      <li>Practice pre-operational checks and shutdown procedures</li>
                      <li>Study legislation and environmental considerations</li>
                      <li>Retake the test after thorough review</li>
                    </ul>
                    <p className="mt-3 font-medium">💡 <strong>Tip:</strong> Use the training modules to review specific topics before retaking the test.</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={handleResetFinalTest}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 text-sm font-medium transition-colors"
                >
                  Retake Test
                </button>
                
                <button 
                  onClick={() => setShowFinalTest(false)}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                  Back to Training
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const SectionContent = ({ sectionKey, data }) => {
    if (sectionKey === 'dashboard') {
      return <DashboardContent />;
    }

    const relevantChecks = knowledgeChecks.filter(check => check.section === sectionKey);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">{data.title}</h1>
          <button
            onClick={() => markSectionComplete(sectionKey)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm ${
              completedSections.has(sectionKey) 
                ? 'bg-green-100 text-green-700' 
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            <CheckCircle className="h-4 w-4" />
            <span>{completedSections.has(sectionKey) ? 'Completed' : 'Complete'}</span>
          </button>
        </div>

        {data.content && typeof data.content === 'object' && (
          <div className="space-y-4">
            {Object.entries(data.content).map(([key, value]) => (
              <div key={key} className="bg-white p-4 rounded-lg shadow border">
                {typeof value === 'string' ? (
                  <p className="text-gray-700 text-sm">{value}</p>
                ) : Array.isArray(value) ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    <ul className="space-y-2">
                      {value.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <ChevronRight className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">
                            {typeof item === 'object' ? (
                              <div>
                                <strong>{item.name}:</strong> {item.description}
                              </div>
                            ) : (
                              item
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    <div className="space-y-2">
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <div key={subKey} className="border-l-4 border-orange-500 pl-3">
                          <h4 className="font-medium capitalize text-sm">{subKey.replace(/([A-Z])/g, ' $1')}:</h4>
                          <p className="text-gray-700 mt-1 text-sm">{subValue}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {data.subsections && (
          <div className="space-y-3">
            {Object.entries(data.subsections).map(([subKey, subData]) => (
              <div key={subKey} className="bg-white rounded-lg shadow border">
                <button
                  onClick={() => toggleSection(subKey)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <h3 className="text-lg font-semibold">{subData.title}</h3>
                  {expandedSections.has(subKey) ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </button>
                {expandedSections.has(subKey) && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="pt-3 space-y-3">
                      {subData.content.purpose && (
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Purpose:</h4>
                          <p className="text-gray-700 text-sm">{subData.content.purpose}</p>
                        </div>
                      )}
                      {subData.content.requirements && (
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Requirements:</h4>
                          <ul className="space-y-1">
                            {subData.content.requirements.map((req, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-orange-500 mt-1 text-sm">•</span>
                                <span className="text-gray-700 text-sm">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {subData.content.responsibilities && (
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Key Responsibilities:</h4>
                          <ul className="space-y-1">
                            {subData.content.responsibilities.map((resp, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-orange-500 mt-1 text-sm">•</span>
                                <span className="text-gray-700 text-sm">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {relevantChecks.map((check, index) => (
          <KnowledgeCheck key={check.id} check={check} />
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'training':
        return <TrainingContent />;
      case 'resources':
        return <ResourcesContent />;
      case 'profile':
        return <ProfileContent />;
      case 'help-support':
        return <HelpSupportContent />;
      default:
        return <SectionContent sectionKey={activeSection} data={trainingData[activeSection]} />;
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(sectionId)) {
        newExpanded.delete(sectionId);
      } else {
        newExpanded.add(sectionId);
      }
      return newExpanded;
    });
  };

  const markSectionComplete = (sectionId) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
  };

  // Auto-mark sections as complete when viewed (for demo purposes)
  useEffect(() => {
    if (activeSection && isTrainingModule(activeSection)) {
      // Mark section as complete after a short delay to simulate learning
      const timer = setTimeout(() => {
        markSectionComplete(activeSection);
      }, 5000); // 5 seconds delay
      
      return () => clearTimeout(timer);
    }
  }, [activeSection]); // Add activeSection as dependency

  const ResourcesContent = () => {
    return (
      <div className="space-y-4 pb-8">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Training Resources</h1>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3 text-blue-900">📚 Operator Manuals</h3>
          <p className="text-sm text-gray-700 mb-3">
            Always refer to the specific machine's operator manual for detailed procedures and specifications.
          </p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Important:</strong> Each excavator model may have specific requirements and procedures. 
              Always consult the manufacturer's manual for your specific machine.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3 text-green-900">📱 QR Code Resources</h3>
          <p className="text-sm text-gray-700 mb-3">
            Scan QR codes throughout the workbook for additional content including videos and reading materials.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">📹 Video Content</h4>
              <p className="text-sm text-green-700">Safety procedures, operating techniques, and best practices</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">📖 Reading Materials</h4>
              <p className="text-sm text-green-700">Additional guides, regulations, and technical documents</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3 text-orange-900">🛡️ OperateSAFE Campaign</h3>
          <p className="text-sm text-gray-700 mb-3">
            Company-wide Health & Safety campaign championed by Flannery Plant Hire. 
            Familiarize yourself with internal and external health and safety campaigns when starting at new jobs.
          </p>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>Safety First:</strong> Always put safety first and STOP any activity that could lead to harm 
              to yourself or others. Always seek assistance and OperateSAFE.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3 text-purple-900">📊 Literacy, Numeracy & ICT</h3>
          <p className="text-sm text-gray-700 mb-3">
            English, Mathematics and ICT are embedded into the content. You will be required to:
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Extract information from operator manuals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Conduct simple calculations of bucket capacities</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Read digital screens in the cab</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Use training simulators effectively</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3 text-red-900">⚠️ Knowledge Stops</h3>
          <p className="text-sm text-gray-700 mb-3">
            Throughout the training, you will encounter Knowledge Stops - your chance to put your learning to the test.
          </p>
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Assessment:</strong> These knowledge checks help reinforce learning and ensure understanding 
              of key safety and operational concepts.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-3 text-indigo-900">🎯 Course Objectives</h3>
          <p className="text-sm text-gray-700 mb-3">
            All content delivered on this course meets the requirements set out in the National Occupational Standards for this machine type.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Understand relevant legislation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Identify hazards and control measures</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Perform pre-operational checks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Operate safely in various conditions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Shut down machinery safely</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white mb-8">
          <h3 className="text-lg font-semibold mb-2">💡 Getting Maximum Benefit</h3>
          <p className="text-sm mb-3">
            To get the maximum benefit from your training:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Complete all knowledge stops thoroughly</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Review operator manuals regularly</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Practice safety procedures consistently</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Seek clarification when needed</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 max-w-full overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 max-w-full">
        <div className="flex items-center justify-between max-w-full">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-gray-900 truncate">
              {activeSection === 'dashboard' ? 'Flannery Training' : 
               activeSection === 'training' ? 'Training Modules' :
               activeSection === 'progress' ? 'Progress' :
               activeSection === 'profile' ? 'Profile' :
               activeSection === 'help-support' ? 'Help & Support' :
               trainingData[activeSection]?.title || 'Training'}
            </h1>
            <p className="text-xs text-gray-500">Mobile Training Platform</p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button className="p-2 hover:bg-gray-100 rounded-lg" title="Bookmark">
              <Bookmark className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg" title="Reset">
              <RotateCcw className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-32 max-w-full">
        <div className="px-4 max-w-full">
          {renderContent()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-gradient-to-r from-white to-orange-50 border-t-2 border-orange-300 shadow-xl px-4 py-3 fixed bottom-0 left-0 right-0 z-50 max-w-full">
        <div className="flex justify-around max-w-full">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.key;
            
            return (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-200 min-w-[60px] max-w-[80px] ${
                  isActive 
                    ? 'text-white bg-orange-600 shadow-lg transform scale-105' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-100'
                }`}
              >
                <Icon className={`h-6 w-6 mb-1 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                <span className={`text-xs font-bold text-center ${isActive ? 'text-white' : 'text-gray-700'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-2 h-2 bg-white rounded-full mt-1"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default FlanneryTrainingApp; 