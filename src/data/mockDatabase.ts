import { TransitRoute, PassengerRecord, PredictionRecord, MLModelMetrics, User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_01',
    name: 'Kapil Prajapati',
    email: 'kapilprajapati1489@gmail.com',
    role: 'admin',
    createdAt: '2026-09-01T10:00:00Z',
    lastLogin: '2026-09-22T19:45:00Z'
  },
  {
    id: 'usr_02',
    name: 'Vikram Mehta (Chief Transit Planner)',
    email: 'vikram.authority@transit.gov.in',
    role: 'authority',
    createdAt: '2026-09-03T11:30:00Z',
    lastLogin: '2026-09-22T18:15:00Z'
  },
  {
    id: 'usr_03',
    name: 'Pooja Sharma (Daily Commuter)',
    email: 'pooja.passenger@example.com',
    role: 'passenger',
    createdAt: '2026-09-10T08:20:00Z',
    lastLogin: '2026-09-22T14:30:00Z'
  }
];

export const INITIAL_ROUTES: TransitRoute[] = [
  {
    id: 'route_101',
    routeCode: '101',
    routeName: 'Route 101 (Western Suburban Express)',
    source: 'Andheri',
    destination: 'Dadar',
    transportType: 'Train',
    stops: ['Andheri', 'Vile Parle', 'Santacruz', 'Khar Road', 'Bandra', 'Mahim', 'Matunga Road', 'Dadar'],
    distanceKm: 14.2,
    avgDurationMin: 26,
    frequencyMin: 4,
    capacityPerVehicle: 1200,
    activeStatus: true
  },
  {
    id: 'route_205',
    routeCode: '205',
    routeName: 'Route 205 (Northern Corridor Fast)',
    source: 'Borivali',
    destination: 'Churchgate',
    transportType: 'Train',
    stops: ['Borivali', 'Kandivali', 'Malad', 'Andheri', 'Bandra', 'Dadar', 'Mumbai Central', 'Churchgate'],
    distanceKm: 34.0,
    avgDurationMin: 52,
    frequencyMin: 6,
    capacityPerVehicle: 1400,
    activeStatus: true
  },
  {
    id: 'route_m1',
    routeCode: 'Metro-1',
    routeName: 'Metro Line 1 (Blue Line Corridor)',
    source: 'Versova',
    destination: 'Ghatkopar',
    transportType: 'Metro',
    stops: ['Versova', 'D.N. Nagar', 'Azad Nagar', 'Andheri Metro', 'Western Express Hwy', 'Chakala', 'Airport Road', 'Marol Naka', 'Saki Naka', 'Asalpha', 'Jagruti Nagar', 'Ghatkopar'],
    distanceKm: 11.4,
    avgDurationMin: 22,
    frequencyMin: 3,
    capacityPerVehicle: 1100,
    activeStatus: true
  },
  {
    id: 'route_302',
    routeCode: '302',
    routeName: 'Route 302 (Central Main Line)',
    source: 'Thane',
    destination: 'CST (Chhatrapati Shivaji Terminus)',
    transportType: 'Train',
    stops: ['Thane', 'Mulund', 'Bhandup', 'Ghatkopar', 'Kurla', 'Dadar Central', 'Byculla', 'CST'],
    distanceKm: 33.8,
    avgDurationMin: 55,
    frequencyMin: 5,
    capacityPerVehicle: 1500,
    activeStatus: true
  },
  {
    id: 'route_108',
    routeCode: '108',
    routeName: 'Route 108 (East-West Transit Connector)',
    source: 'Bandra',
    destination: 'Kurla',
    transportType: 'Bus',
    stops: ['Bandra Station (East)', 'Kalanagar', 'Family Court BKC', 'Bharat Diamond Bourse', 'ICICI Bank Towers', 'MTNL Kurla', 'Kurla Station (West)'],
    distanceKm: 7.8,
    avgDurationMin: 28,
    frequencyMin: 8,
    capacityPerVehicle: 75,
    activeStatus: true
  },
  {
    id: 'route_440',
    routeCode: '440',
    routeName: 'Route 440 (Suburban Ring Bus)',
    source: 'Borivali',
    destination: 'Bandra Kurla Complex (BKC)',
    transportType: 'Bus',
    stops: ['Borivali Station', 'Kandivali WEH', 'Malad Pushpa Park', 'Goregaon Hub', 'Jogeshwari', 'Andheri Flyover', 'BKC Connector'],
    distanceKm: 21.5,
    avgDurationMin: 65,
    frequencyMin: 12,
    capacityPerVehicle: 80,
    activeStatus: true
  },
  {
    id: 'route_m2a',
    routeCode: 'Metro-2A',
    routeName: 'Metro Line 2A (Yellow Link)',
    source: 'Dahisar',
    destination: 'Andheri West',
    transportType: 'Metro',
    stops: ['Dahisar East', 'Anand Nagar', 'Kandarpada', 'Mandapeshwar', 'Borivali West', 'Pahadi Goregaon', 'Lower Malad', 'DN Nagar (Andheri W)'],
    distanceKm: 18.6,
    avgDurationMin: 36,
    frequencyMin: 5,
    capacityPerVehicle: 950,
    activeStatus: true
  },
  {
    id: 'route_707',
    routeCode: '707-AC',
    routeName: 'Route 707 (Airport Express Shuttle)',
    source: 'Airport Terminal 2',
    destination: 'Dadar East',
    transportType: 'Bus',
    stops: ['Airport T2', 'Domestic T1 Santacruz', 'Vile Parle Highway', 'Bandra Kalanagar', 'Sion Circle', 'Dadar East Flyover'],
    distanceKm: 16.4,
    avgDurationMin: 45,
    frequencyMin: 15,
    capacityPerVehicle: 60,
    activeStatus: true
  }
];

export const INITIAL_PASSENGER_DATA: PassengerRecord[] = [
  { dataId: 'dt_001', routeId: 'route_101', date: '2026-09-01', time: '08:00', day: 'Tuesday', passengerCount: 850, isHoliday: false, isPeakHour: true },
  { dataId: 'dt_002', routeId: 'route_101', date: '2026-09-01', time: '08:30', day: 'Tuesday', passengerCount: 980, isHoliday: false, isPeakHour: true },
  { dataId: 'dt_003', routeId: 'route_101', date: '2026-09-01', time: '11:00', day: 'Tuesday', passengerCount: 320, isHoliday: false, isPeakHour: false },
  { dataId: 'dt_004', routeId: 'route_101', date: '2026-09-01', time: '14:30', day: 'Tuesday', passengerCount: 390, isHoliday: false, isPeakHour: false },
  { dataId: 'dt_005', routeId: 'route_101', date: '2026-09-01', time: '17:30', day: 'Tuesday', passengerCount: 920, isHoliday: false, isPeakHour: true },
  { dataId: 'dt_006', routeId: 'route_101', date: '2026-09-01', time: '19:00', day: 'Tuesday', passengerCount: 890, isHoliday: false, isPeakHour: true },
  { dataId: 'dt_007', routeId: 'route_101', date: '2026-09-01', time: '22:00', day: 'Tuesday', passengerCount: 260, isHoliday: false, isPeakHour: false },
  { dataId: 'dt_008', routeId: 'route_205', date: '2026-09-01', time: '08:30', day: 'Tuesday', passengerCount: 1250, isHoliday: false, isPeakHour: true },
  { dataId: 'dt_009', routeId: 'route_205', date: '2026-09-01', time: '13:00', day: 'Tuesday', passengerCount: 450, isHoliday: false, isPeakHour: false },
  { dataId: 'dt_010', routeId: 'route_205', date: '2026-09-01', time: '18:15', day: 'Tuesday', passengerCount: 1320, isHoliday: false, isPeakHour: true },
  { dataId: 'dt_011', routeId: 'route_m1', date: '2026-09-01', time: '09:00', day: 'Tuesday', passengerCount: 890, isHoliday: false, isPeakHour: true },
  { dataId: 'dt_012', routeId: 'route_m1', date: '2026-09-01', time: '12:00', day: 'Tuesday', passengerCount: 310, isHoliday: false, isPeakHour: false },
  { dataId: 'dt_013', routeId: 'route_m1', date: '2026-09-01', time: '18:45', day: 'Tuesday', passengerCount: 940, isHoliday: false, isPeakHour: true },
  { dataId: 'dt_014', routeId: 'route_108', date: '2026-09-01', time: '08:45', day: 'Tuesday', passengerCount: 72, isHoliday: false, isPeakHour: true },
  { dataId: 'dt_015', routeId: 'route_108', date: '2026-09-01', time: '11:30', day: 'Tuesday', passengerCount: 24, isHoliday: false, isPeakHour: false },
  { dataId: 'dt_016', routeId: 'route_108', date: '2026-09-01', time: '17:45', day: 'Tuesday', passengerCount: 68, isHoliday: false, isPeakHour: true },
  { dataId: 'dt_017', routeId: 'route_302', date: '2026-09-01', time: '08:20', day: 'Tuesday', passengerCount: 1410, isHoliday: false, isPeakHour: true },
  { dataId: 'dt_018', routeId: 'route_302', date: '2026-09-01', time: '15:10', day: 'Tuesday', passengerCount: 520, isHoliday: false, isPeakHour: false },
  { dataId: 'dt_019', routeId: 'route_440', date: '2026-09-01', time: '09:15', day: 'Tuesday', passengerCount: 74, isHoliday: false, isPeakHour: true },
  { dataId: 'dt_020', routeId: 'route_707', date: '2026-09-01', time: '20:30', day: 'Tuesday', passengerCount: 42, isHoliday: false, isPeakHour: false }
];

export const INITIAL_PREDICTIONS: PredictionRecord[] = [
  {
    predictionId: 'pred_901',
    routeId: 'route_101',
    routeName: 'Route 101 (Western Suburban Express)',
    source: 'Andheri',
    destination: 'Dadar',
    transportType: 'Train',
    date: '2026-09-23',
    time: '08:30',
    dayOfWeek: 'Wednesday',
    predictedCrowd: 'HIGH',
    confidence: 0.89,
    expectedPassengers: 880,
    maxCapacity: 1200,
    capacityPercentage: 73,
    isPeakHour: true,
    isHoliday: false,
    recommendedAlternativeTimes: [
      { time: '07:15 AM', crowdLevel: 'MEDIUM', expectedPassengers: 540, deltaPassengers: -340 },
      { time: '10:45 AM', crowdLevel: 'LOW', expectedPassengers: 290, deltaPassengers: -590 },
      { time: '11:15 AM', crowdLevel: 'LOW', expectedPassengers: 310, deltaPassengers: -570 }
    ],
    timestamp: '2026-09-22T19:40:00Z'
  },
  {
    predictionId: 'pred_902',
    routeId: 'route_m1',
    routeName: 'Metro Line 1 (Blue Line Corridor)',
    source: 'Versova',
    destination: 'Ghatkopar',
    transportType: 'Metro',
    date: '2026-09-23',
    time: '11:00',
    dayOfWeek: 'Wednesday',
    predictedCrowd: 'LOW',
    confidence: 0.94,
    expectedPassengers: 310,
    maxCapacity: 1100,
    capacityPercentage: 28,
    isPeakHour: false,
    isHoliday: false,
    recommendedAlternativeTimes: [],
    timestamp: '2026-09-22T19:15:00Z'
  },
  {
    predictionId: 'pred_903',
    routeId: 'route_108',
    routeName: 'Route 108 (East-West Transit Connector)',
    source: 'Bandra',
    destination: 'Kurla',
    transportType: 'Bus',
    date: '2026-09-23',
    time: '17:30',
    dayOfWeek: 'Wednesday',
    predictedCrowd: 'HIGH',
    confidence: 0.87,
    expectedPassengers: 68,
    maxCapacity: 75,
    capacityPercentage: 91,
    isPeakHour: true,
    isHoliday: false,
    recommendedAlternativeTimes: [
      { time: '04:15 PM', crowdLevel: 'MEDIUM', expectedPassengers: 42, deltaPassengers: -26 },
      { time: '08:45 PM', crowdLevel: 'LOW', expectedPassengers: 22, deltaPassengers: -46 }
    ],
    timestamp: '2026-09-22T18:50:00Z'
  }
];

export const INITIAL_ML_METRICS: MLModelMetrics = {
  name: 'Random Forest Transit Classifier',
  algorithm: 'Random Forest (100 Estimators, max_depth=12)',
  accuracy: 0.924,
  precision: 0.918,
  recall: 0.920,
  f1Score: 0.919,
  trainedRecordsCount: 24850,
  lastTrainedDate: '2026-09-20 04:30 UTC',
  confusionMatrix: {
    labels: ['LOW', 'MEDIUM', 'HIGH'],
    matrix: [
      [3120, 180, 45],   // Actual LOW
      [140, 2890, 210],  // Actual MEDIUM
      [35, 195, 3420]    // Actual HIGH
    ]
  },
  featureImportances: [
    { feature: 'Time of Day (Hour/Minute)', importance: 0.38, description: 'Commute hours vs midday lull' },
    { feature: 'Peak Hour Flag (is_peak)', importance: 0.24, description: 'Morning 8-10:30 & Evening 17-20:30 rush' },
    { feature: 'Route Corridor & Density', importance: 0.18, description: 'Corridor demand index' },
    { feature: 'Transport Type Capacity', importance: 0.10, description: 'Train (1200+) vs Bus (75) dynamics' },
    { feature: 'Day of Week & Weekend', importance: 0.06, description: 'Weekday business commute vs Weekend leisure' },
    { feature: 'Holiday / Special Event Status', importance: 0.04, description: 'Public holidays and local festivities' }
  ]
};

export const DOCUMENT_CONTENT = {
  prd: {
    title: 'Product Requirement Document (PRD)',
    productName: 'Public Transport Crowd Predictor',
    overview: 'The Public Transport Crowd Predictor is a software application that predicts the expected crowd level in public transportation such as buses, trains, and metro services. The system analyzes historical and current transportation data, including passenger count, route, time, day, holidays, and other relevant factors. Based on this information, it predicts whether a particular transport service or route is likely to have Low, Medium, or High crowd levels. The system helps passengers plan journeys and helps transport authorities improve vehicle scheduling.',
    problemStatement: 'Passengers often face severe overcrowding in public transportation, especially during peak commute hours, weekends, holidays, and special events. Commuters rarely know how crowded a vehicle will be before stepping onto the platform or boarding. Transport authorities also struggle with demand visibility to allocate fleets efficiently.',
    goals: [
      'Predict expected crowd levels with high accuracy.',
      'Help passengers select less crowded travel times and alternate routes.',
      'Provide route-wise crowd transparency across train, metro, and bus.',
      'Identify peak travel periods and bottlenecks.',
      'Help transport authorities understand passenger demand and fleet sizing.'
    ],
    targetUsers: [
      { role: 'Passengers', desc: 'Search routes, verify crowd levels (Low/Med/High), choose optimal travel windows.' },
      { role: 'Transport Authorities', desc: 'Monitor crowd trends, detect peak hours, reallocate vehicle frequencies.' },
      { role: 'Administrators', desc: 'Manage users, routes, historical datasets, ML model retraining and auditing.' }
    ],
    scope: {
      inScope: [
        'User registration & secure role-based login',
        'Route and transport search (Source, Destination, Mode)',
        'Historical passenger-data management (CSV upload & manual entry)',
        'Machine learning crowd prediction (Low, Medium, High)',
        'Confidence score & expected passenger volume estimate',
        'Interactive analytics dashboard (Hourly trends, Peak hours, Route comparison)',
        'Admin dashboard for route and data administration',
        'Dual viewports: full desktop workspace & interactive mobile simulator'
      ],
      outOfScope: ['Live fare collection', 'Turnstile ticket gate control', 'Autonomous train autopilot']
    },
    functionalRequirements: [
      { id: 'FR-01', name: 'User Registration', spec: 'Allow users to register with name, email, role, and secure password.' },
      { id: 'FR-02', name: 'User Login & RBAC', spec: 'Secure session login with Passenger, Authority, and Admin roles.' },
      { id: 'FR-03', name: 'Route Search', spec: 'Search public transport by Source (e.g. Andheri) and Destination (e.g. Dadar).' },
      { id: 'FR-04', name: 'Crowd Prediction', spec: 'Predict expected crowd categorized into Low 🟢, Medium 🟡, High 🔴.' },
      { id: 'FR-05', name: 'Prediction Factors', spec: 'Factors: Date, Day, Time, Route, Transport type, Historical volume, Holiday status, Peak hour status.' },
      { id: 'FR-06', name: 'Crowd Information Display', spec: 'Tabular & card presentation of Route, Time, Predicted Crowd, and alternate time savings.' },
      { id: 'FR-07', name: 'Admin Dashboard', spec: 'Add/update/delete routes, upload passenger CSVs, manage users, inspect ML metrics.' },
      { id: 'FR-08', name: 'Data Visualization', spec: 'Graphs showing daily passenger curves, peak hours, weekly heat patterns, route loads.' }
    ]
  },
  technical: {
    title: 'Technical Requirements & Architecture',
    stack: {
      frontend: 'HTML5, CSS3, JavaScript / React 19, Tailwind CSS v4, Lucide Icons, Framer Motion',
      backend: 'Python Flask / Node Express REST API',
      ml: 'Scikit-learn (Random Forest, Decision Tree, Logistic Regression), Pandas, NumPy',
      db: 'MySQL 8.0 relational schema with normalized tables',
      dataViz: 'Interactive SVG / Chart.js data visualization components'
    },
    databaseSchema: [
      {
        table: 'users',
        columns: 'user_id VARCHAR(36) PRIMARY KEY, name VARCHAR(100), email VARCHAR(120) UNIQUE, password VARCHAR(255), role ENUM("passenger","authority","admin"), created_at TIMESTAMP'
      },
      {
        table: 'routes',
        columns: 'route_id VARCHAR(36) PRIMARY KEY, route_name VARCHAR(100), source VARCHAR(60), destination VARCHAR(60), transport_type ENUM("Train","Metro","Bus"), distance_km FLOAT, capacity INT'
      },
      {
        table: 'passenger_data',
        columns: 'data_id VARCHAR(36) PRIMARY KEY, route_id VARCHAR(36) FK, date DATE, time TIME, passenger_count INT, day VARCHAR(15), is_holiday BOOLEAN, is_peak_hour BOOLEAN'
      },
      {
        table: 'predictions',
        columns: 'prediction_id VARCHAR(36) PRIMARY KEY, route_id VARCHAR(36) FK, date DATE, time TIME, predicted_crowd ENUM("LOW","MEDIUM","HIGH"), confidence FLOAT, created_at TIMESTAMP'
      }
    ],
    restEndpoints: [
      { method: 'POST', path: '/api/login', desc: 'Authenticates user and returns JWT session token' },
      { method: 'POST', path: '/api/register', desc: 'Registers a new commuter or transit authority account' },
      { method: 'GET', path: '/api/routes', desc: 'Returns all active transit routes with stops & types' },
      { method: 'POST', path: '/api/predict', desc: 'Input: {route_id, date, time, transport_type} -> Output: {crowd_level, confidence, expected_passengers, alternative_times}' },
      { method: 'GET', path: '/api/predictions', desc: 'Returns historical prediction logs and analytics' },
      { method: 'POST', path: '/api/admin/passenger-data', desc: 'Batch imports or appends verified passenger count records' }
    ]
  },
  security: {
    title: 'Security Rules & Privacy Requirements',
    rules: [
      { code: 'SEC-01', title: 'Password Protection', rule: 'Passwords must never be stored in plain text. Use Argon2/bcrypt with salted rounds.' },
      { code: 'SEC-02', title: 'Role-Based Access Control', rule: 'Strict separation: Passengers access search/predictions; Authorities see analytics; Admins alter routes/data.' },
      { code: 'SEC-03', title: 'SQL Injection Prevention', rule: 'All queries must use parameterized statements or ORM layer; no raw string concatenation.' },
      { code: 'SEC-04', title: 'Data Minimization', rule: 'Only essential commuter inputs collected (source, dest, time). No phone tracking or private identity required.' },
      { code: 'SEC-05', title: 'Passenger Aggregation & Anonymity', rule: 'Passenger counts stored purely as aggregated counts per route-time slot (e.g. "850 passengers at 8:30 AM") without personal identifiers.' }
    ]
  }
};
