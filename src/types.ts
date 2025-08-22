export type School = {
  school_id: number
  school_name: string
  yishuv_name: string
  latitude: number
  longitude: number
}

export type InjuredYearRecord = {
  accident_year: number | string
  light_injured_count?: number | string
  severly_injured_count?: number | string
  killed_count?: number | string
}

export type MonthlyRecord = {
  accident_month_hebrew: string
  count_1: number
}

export type SexRecord = {
  sex_hebrew: string
  count_1: number
}

// Municipality comparison data
export type MunicipalityComparison = {
  cityName: string
  percentChange: number
  totalAccidents: number
  trend: 'improvement' | 'worsening'
}

// Transportation mode statistics
export type TransportationModeStats = {
  mode: string
  period2015_2020: {
    totalInjured: number
    lightInjuries: number
    severeInjuries: number
    deaths: number
  }
  period2020_2025: {
    totalInjured: number
    lightInjuries: number
    severeInjuries: number
    deaths: number
  }
}

// City ranking data
export type CityRanking = {
  rank: number
  cityName: string
  compositeScore: number
  totalAccidents: number
  totalInjured: number
  lightInjuries: number
  severeInjuries: number
  deaths: number
}

// Educational cluster data
export type EducationalCluster = {
  clusterName: string
  cityName: string
  totalInstitutions: number
  totalInjured: number
  severeInjuries: number
  deaths: number
}
