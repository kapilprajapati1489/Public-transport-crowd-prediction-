export type TransportType = 'Train' | 'Metro' | 'Bus';
export type CrowdLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type UserRole = 'passenger' | 'authority' | 'admin';
export type ViewDeviceMode = 'desktop' | 'mobile' | 'responsive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface TransitRoute {
  id: string;
  routeCode: string;
  routeName: string;
  source: string;
  destination: string;
  transportType: TransportType;
  stops: string[];
  distanceKm: number;
  avgDurationMin: number;
  frequencyMin: number;
  capacityPerVehicle: number;
  activeStatus: boolean;
}

export interface PassengerRecord {
  dataId: string;
  routeId: string;
  date: string;
  time: string;
  day: string;
  passengerCount: number;
  isHoliday: boolean;
  isPeakHour: boolean;
}

export interface PredictionRecord {
  predictionId: string;
  routeId: string;
  routeName: string;
  source: string;
  destination: string;
  transportType: TransportType;
  date: string;
  time: string;
  dayOfWeek: string;
  predictedCrowd: CrowdLevel;
  confidence: number;
  expectedPassengers: number;
  maxCapacity: number;
  capacityPercentage: number;
  isPeakHour: boolean;
  isHoliday: boolean;
  recommendedAlternativeTimes: {
    time: string;
    crowdLevel: CrowdLevel;
    expectedPassengers: number;
    deltaPassengers: number;
  }[];
  timestamp: string;
}

export interface MLModelMetrics {
  name: string;
  algorithm: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainedRecordsCount: number;
  lastTrainedDate: string;
  confusionMatrix: {
    labels: CrowdLevel[];
    matrix: number[][]; // [actual][predicted]
  };
  featureImportances: {
    feature: string;
    importance: number;
    description: string;
  }[];
}
