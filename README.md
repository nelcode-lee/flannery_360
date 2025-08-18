# Flannery 360 Excavator Training App

A mobile-first web application for 360° excavator operator training, built with React and Tailwind CSS.

## 🚀 Features

- **Mobile-First Design** - Optimized for mobile devices with responsive sidebar navigation
- **Interactive Training Modules** - Comprehensive learning content covering safety, operations, and techniques
- **Progress Tracking** - Visual progress indicators and completion status
- **Knowledge Checks** - Interactive quizzes to test understanding
- **Collapsible Sections** - Expandable content for better mobile navigation
- **Search Functionality** - Quick search through training content
- **Safety Focus** - Emphasizes OperateSAFE principles throughout
- **3D Interactive Excavator** - Interactive 3D model viewer with component identification
- **AI Research Assistant** - CITB training instructor simulation for expert guidance
- **Enhanced Resources** - Interactive manuals, safety checklists, and QR code resources

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Beautiful & consistent icon toolkit
- **Mobile-First Design** - Responsive design optimized for mobile devices
- **Sketchfab Viewer API** - Interactive 3D model visualization
- **OpenAI API Integration** - AI-powered training assistance

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flannery-training-app
   ```

2. **Run the setup script**
   ```bash
   ./setup.sh
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the app for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## 📁 Project Structure

```
flannery-training-app/
├── public/
│   ├── index.html
│   └── flannery-excavator.png
├── src/
│   ├── App.js (FlanneryTrainingApp component)
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── setup.sh
├── .env (for API configuration)
├── .gitignore
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Electric Blue (`#3b82f6` - `#1e40af`)
- **Success**: Green (`#10b981`)
- **Warning**: Amber (`#f59e0b`)
- **Info**: Blue (`#3b82f6`)
- **Neutral**: Gray scale (`#f9fafb` - `#111827`)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Sidebar Navigation** - Collapsible mobile-friendly navigation
- **Cards** - Consistent card design with shadows and rounded corners
- **Buttons** - Primary and secondary button styles
- **Progress Indicators** - Visual progress tracking
- **Knowledge Checks** - Interactive quiz components

## 📚 Comprehensive Training Modules

The Flannery 360 Excavator Training System includes **15 comprehensive training modules** designed to provide operators with complete knowledge and skills for safe and efficient operation.

### 🏠 Dashboard & Overview
- **Progress Overview** - Visual completion tracking across all modules
- **Safety Reminders** - Daily safety focus and OperateSAFE principles
- **Quick Actions** - Direct access to key training activities
- **Learning Statistics** - Time tracking, current streak, and estimated completion
- **Recent Activity** - Latest training progress and achievements

### 📖 Introduction to 360° Excavator
**Learning Objectives (17 comprehensive objectives):**
- Understand relevant legislation relating to work activities
- Comply with manufacturer's instructions using operator's handbook
- Identify hazards associated with plant/machinery operations
- Identify machine components and operator controls
- Perform pre-shift and operational checks
- Prepare excavator for site travel and various terrains
- Manoeuvre in confined areas safely
- Prepare machine and bucket for excavation
- Demonstrate safe attachment/removal of buckets and ancillaries
- Select appropriate techniques for essential tasks
- Operate plant and machinery for excavation activities
- Perform excavation in various soil types
- Demonstrate safe spoil placement into transporting vehicles
- Demonstrate grading, spreading, and leveling techniques
- Explain loading/unloading procedures for transporters
- Shut down machinery safely and secure at end of operation

**Key Content:**
- Machine overview and description
- Construction site safety awareness
- Safe working practices and OperateSAFE principles

### ⚖️ Health & Safety Legislation
**Comprehensive Coverage:**
- **Health and Safety at Work Act 1974**
  - Employer duties: safe working conditions, equipment maintenance, training, risk assessments
  - Employee duties: self-care, cooperation, proper equipment use
- **PUWER 98 Regulations (Provision & Use of Work Equipment)**
  - Equipment suitability and maintenance requirements
  - Training and information requirements
  - Safety measures including ROPS and FOPS
- **Additional Legislation:**
  - Management of Health and Safety at Work Regulations
  - Construction (Design and Management) Regulations
  - Vibration at Work Regulations
  - Road Traffic Act
  - Control of Substances Hazardous to Health
  - Control of Noise Regulations

### 🔍 Risk Assessment & Method Statements
**Risk Assessment Process:**
- Hazard identification and evaluation
- Risk likelihood and severity assessment
- Control measure implementation
- **Method Statements:** Specific safe work procedure documentation
- **Social Responsibilities:** Environmental protection, community safety, sustainable practices

### 🏗️ Site Induction & Responsibilities
**Site Induction Topics:**
- Access and egress procedures
- Safety signs and signals
- Accident reporting protocols
- Emergency procedures
- PPE/RPE requirements
- Welfare facilities
- Site layout and traffic routes
- Restricted/prohibited areas
- Confined spaces awareness
- Buried services identification
- Lifting operations safety
- Working from height procedures

**Operator Responsibilities:**
- Training, competence, and authorization requirements
- Vehicle key management
- Method statement compliance
- Punctuality and cooperation
- Operator's manual usage
- Control layout understanding
- Stability limits awareness

### ⚙️ Major Components & Safety Features
**Power Unit & Oils:**
- Engine oil safety procedures (glove requirements)
- Hydraulic system maintenance and cleanliness
- Fuel system management (end-of-shift filling)
- Cooling system safety (pressurized system awareness)

**Safety Features:**
- **ROPS (Roll Over Protective Structure)** - Overturn protection
- **FOPS (Falling Object Protective Structure)** - Material impact protection
- **Seatbelt Systems** - Operator restraint requirements
- **Other Components:** Chassis/track assembly, electrical systems, hydraulic lockout controls, quick hitch couplers

### ✅ Pre-Operational Checks
**Essential Checks:**
- Hydraulic oil system levels
- Windscreen washer levels
- Greasing requirements
- Indicators and gauges
- Seat belt inspection
- Track adjustment
- Travel alarm functionality
- Mirrors and windows condition

**Running Checks:**
- Hydraulic system operation
- Lighting systems (flashing beacon)
- Horn functionality
- Slew and movement testing
- Quick hitch operation
- Safety systems verification
- Re-fuelling procedures

**PPE Requirements:**
- Head, foot, and eye protection
- High-visibility clothing
- Weather-appropriate gear
- Hearing protection
- Gloves for specific tasks

### 🚗 Site Travel & Maneuvering
**Getting On/Off Procedures:**
- Face machine using specific steps and handrails
- Maintain 3-point contact
- Ensure clean, clear access
- Firm ground verification
- Proper footwear requirements

**Site Travel Preparation:**
- Control neutralization
- Seat adjustment for comfort/reach
- Seatbelt usage and adjustment
- Engine speed optimization
- Hydraulic lockout control positioning
- Boom positioning for ground clearance
- Travel speed selection
- Drive sprocket positioning

**Visibility Aids:**
- Mirror and camera maintenance
- LED lighting systems
- Approach lighting considerations

**Restricted Space Operation:**
- Static dimension awareness
- Minimum clearance requirements (0.5m)
- Height and slew restrictor usage
- Plant and vehicle marshaller requirements
- Traffic route planning

### 🚧 Operating in Confined Areas
**Safety Innovations:**
- **Spillard Human Detection System:**
  - Human form identification through deep intelligent mapping
  - Collision risk warnings
  - All-around awareness improvement
  - Background change adaptation
- **Safety Shield AI Collision Avoidance:**
  - AI human form recognition
  - HD camera integration
  - In-cab LED visual and audio alerts
  - External alarm and Digital Thumbs Up display
  - Smart pedestrian detection filtering

**Visibility Considerations:**
- Machine perimeter awareness
- LED lighting utilization
- Marshaller requirements
- Safe distance maintenance
- Counterweight danger awareness

**Counterweight Safety:**
- Extension beyond machine footprint
- Rotation collision risks
- Clearance calculation requirements
- Full machine envelope awareness

**Clearance Requirements:**
- Minimum distance calculations
- Full machine envelope consideration
- Exclusion zone establishment
- Spotter/marshaller utilization
- Operation cessation protocols

**Best Practices:**
- Thorough risk assessment
- Clear communication protocols
- Technology utilization
- Constant envelope awareness
- Immediate safety response
- Alternative approach consideration

### 🔗 Quick Hitch & Attachments
**Bucket Types:**
- Digging, trenching, ditching buckets
- Grading and trapezoidal buckets
- 360° rotating buckets

**Quick Hitch Classifications:**
- **Manual:** Operator isolation, manual pin removal
- **Semi-Automatic:** Hydraulic operation, manual locking
- **Fully Automatic:** Complete cab operation

**Pre-Use Checks:**
- Coupler damage inspection
- Crack detection
- Hydraulic line condition
- Pin and clip security
- Post-coupling verification

### 🚜 Excavating Duties
**Safety Checks at Work Area:**
- Hazard identification before setup
- Exclusion zone establishment
- Full observation protocols
- Level machine positioning
- Optimal operator positioning
- Terrain consideration
- Drawing and plan adherence
- Correct spoil placement

**Loading Setup Requirements:**
- Level ground verification
- Vehicle security assessment
- Platform preparation
- Appropriate bucket selection
- Forward tipping safety protocols

### ⚡ Underground & Overhead Services
**Overhead Services:**
- HSE GS6 publication compliance
- Voltage-based distance requirements
- Proper planning and management

**Underground Services:**
- HSE HSG47 publication compliance
- **Color Coding System:**
  - Red/Black: Electricity
  - Orange: Street lighting
  - Yellow: Gas
  - Green: Communications
  - Blue: Water
  - Grey: Telecommunications/Water
- Identification methods: desktop studies, site investigation, physical identification, marker tapes

### 🏔️ Types of Excavation
**Material Types:**
- **Topsoil:** Exposed layer removal
- **Earth:** Sub-topsoil layer removal
- **Rock:** Special method requirements
- **Muck:** Excessively wet material
- **Unclassified:** Material combinations

**Purpose Types:**
- **Cut and Fill:** Material stripping
- **Trench:** Length-exceeds-depth excavation
- **Footing:** Strip foundation formation
- **Basement:** Below-ground building parts
- **Road:** Topsoil stripping and leveling
- **Bridge:** Foundation and abutment work

**Excavation Support:**
- Timber support systems
- Trench boxes and sheets
- Caissons and cofferdams
- Instability factors: vibration, weather, edge loads, support failure

### 🕳️ Trenching Techniques
**Specialized Techniques:**
- Top-down layering approach
- Edge-to-center progression
- Optimal machine positioning
- Machine envelope utilization

**Backfill and Compaction:**
- Critical reinstatement performance
- Material assessment requirements
- Staged laying for proper compaction

### 🏋️ Lifting with Excavators
**Lifting Capacity Charts:**
- Dipper arm length impact
- Reach limitations
- Height/depth considerations
- Safe working load (SWL) compliance
- Machine configuration stability

**Machine Requirements:**
- **Less than 1 tonne:** Load chart, lifting eye
- **Greater than 1 tonne:** Load chart, lifting eye, overload warning device, RCI (Rate Capacity Indicator)

**Lifting Procedures:**
- Lift plan or method statement requirement
- Hydraulic disengagement protocols
- Slinger communication protocols
- Smooth operation control
- Overload warning response
- Ground condition verification

### 🌍 Environmental Considerations
**Pollution Types:**
- Air, water, and noise pollution

**Prevention Measures:**
- Engine speed optimization
- Fluid spillage prevention
- Machine maintenance
- Prior work task planning

### 🚛 Loading/Unloading Procedures
**Pre-Loading Checks:**
- Ground support assessment
- Ramp condition verification
- Hazard identification
- Trailer positioning
- Travel direction planning

**Loading Process:**
- Trailer cleaning
- Parking brake verification
- Bodywork damage inspection
- Ramp security
- Machine alignment
- Slow ramp progression
- Bucket positioning
- Engine shutdown and security

**Exclusion Zone:**
- Personnel clearance
- Minimum machine height clearance
- Restricted space risk assessment

### 🔒 End of Work & Shutdown
**Shutdown Procedures:**
- Full shutdown protocol compliance
- Bucket/attachment lowering
- Engine shutdown
- Key removal and machine security
- Final safety checks

**Parking Considerations:**
- Avoid site roads and pedestrian routes
- Avoid soft/wet/steep ground
- Avoid access/egress route blocking

### 📚 Training Resources
**Additional Resources:**
- **Operator Manuals:** Machine-specific procedure references
- **QR Code Resources:** Video and reading material access
- **OperateSAFE Campaign:** Company-wide health and safety initiative
- **Literacy, Numeracy & ICT:** Essential skills for effective operation

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Electric blue color palette for modern branding
- Mobile-first responsive design
- Custom component classes

### Environment Variables
Create a `.env` file in the root directory for environment-specific configuration:

```env
# OpenAI API Configuration (Optional - for enhanced AI responses)
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

# Environment Configuration
REACT_APP_ENVIRONMENT=development
REACT_APP_API_URL=https://api.openai.com/v1
```

**To enable enhanced AI responses:**
1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
2. Add your API key to the `.env` file
3. Restart the development server
4. The AI Research feature will automatically use the API key

**Security Note:** The `.env` file is excluded from version control to keep your API key secure.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@flannery.com
- Documentation: [docs.flannery.com](https://docs.flannery.com)
- Issues: [GitHub Issues](https://github.com/flannery/training-app/issues)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Sketchfab](https://sketchfab.com/) - 3D model visualization platform
- [OpenAI](https://openai.com/) - AI-powered training assistance

---

**Flannery Training App** - Empowering excavator operators with comprehensive, mobile-first training and certification. 

**Total Training Modules:** 15+ comprehensive modules  
**Learning Objectives:** 17 detailed objectives  
**Safety Focus:** OperateSAFE principles throughout  
**Interactive Features:** 3D viewer, AI assistance, progress tracking 