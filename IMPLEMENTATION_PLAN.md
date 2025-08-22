Implementation Plan: Children's Safety Near Schools Report
Mission Overview
Transform the current React application to match the comprehensive Figma design for "בטיחות הילדים ליד בתי ספר" (Children's Safety Near Schools) report. The design includes both desktop (1920px) and mobile (375px) versions with comprehensive data tables, hero sections, and professional Hebrew typography.

Figma Links

Main Design: https://www.figma.com/design/2kDFw90ITQdPC1I4GJWdQA/בטיחות-הילדים-ליד-בתי-ספר?node-id=25-47

Design System: Multiple responsive breakpoints (Desktop  800px, Mobile 375px)

 ---

## Phase 2: Data Tables & Statistics (Steps 6-12)

### Step 6: Create Data Types for Tables
**Prompt**: Update `src/types.ts` to add new types for comprehensive data tables:

**File**: `src/types.ts`

**New Types**:
```tsx
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
```

### Step 7: Create Municipality Comparison Table
**Prompt**: Create a new `MunicipalityTable.tsx` component with:
- Table showing cities with improvement/worsening trends
- Columns: % Change, City, Total Accidents
- Data from Figma: חולון (-2%), רמלה (-12%), ירושלים (-21%), etc.
- Responsive table design using existing Tailwind breakpoints
- Proper Hebrew text and RTL layout

**File**: `src/components/MunicipalityTable.tsx`

### Step 8: Create Top Cities Ranking Table
**Prompt**: Create a new `TopCitiesTable.tsx` component with:
- Table showing 20 cities with highest injury counts
- Columns: Composite Score, Total Accidents, Total Injured, Light Injuries, Severe Injuries, Deaths, City, Rank
- Data from Figma: ירושלים (20,676), תל אביב (3,485), בני ברק (2,076), etc.
- Responsive design with proper Hebrew text

**File**: `src/components/TopCitiesTable.tsx`

### Step 9: Create Transportation Mode Statistics
**Prompt**: Create a new `TransportationStats.tsx` component with:
- Table comparing 2015-2020 vs 2020-2025 periods
- Rows: Total, Pedestrians, Bicycles, Electric Bicycles, Electric Scooters
- Columns: Total Injured, Light Injuries, Severe Injuries, Deaths
- Data from Figma showing electric scooter increase from 114 to 628
- Responsive design with proper Hebrew text

**File**: `src/components/TransportationStats.tsx`

### Step 10: Create Educational Clusters Table
**Prompt**: Create a new `EducationalClustersTable.tsx` component with:
- Table showing educational institution clusters
- Columns: Total Institutions in Cluster, Total Injured in Cluster, Severe Injuries, Deaths, City, Cluster Name
- Data from Figma: בית יעקב מרגלית, ויזניץ, ישיבת בית מרדכי, etc.
- Responsive design with proper Hebrew text

**File**: `src/components/EducationalClustersTable.tsx`

### Step 11: Integrate All Tables into Report
**Prompt**: Update `src/components/Report.tsx` to:
- Import all new table components
- Replace current Stats component with comprehensive tables
- Add proper spacing and layout between tables
- Ensure responsive design using existing Tailwind breakpoints
- Maintain existing school selection functionality

**File**: `src/components/Report.tsx`

### Step 12: Add Table Styling & Responsiveness
**Prompt**: Style all table components with:
- Professional table design matching Figma
- Responsive breakpoints using existing Tailwind classes
- Proper Hebrew text alignment and RTL support
- Color coding for positive/negative trends
- Hover effects and proper spacing

**Files**: All table component files

---

## Phase 3: Visual Elements & Footer (Steps 13-18)

### Step 13: Add Background Images & Visual Elements
**Prompt**: Update components to use downloaded images:
- Hero background: hero-background-74878c.jpg
- Map images: map-1-162e5f.jpg, map-2-5d0101.jpg, map-3.jpg
- Ensure proper image sizing and responsive behavior
- Add fallback images and loading states

**Files**: Hero.tsx, Map.tsx, and other relevant components

### Step 14: Create Quote Section
**Prompt**: Create a new `Quote.tsx` component with:
- Quote text: "נשמור על ביטחון הילדים יחד. שתפו את הקישור עם הורים ומורים"
- Social sharing functionality (UI components only)
- Professional styling with background color
- Responsive design using existing Tailwind breakpoints

**File**: `src/components/Quote.tsx`

### Step 15: Create Footer Component
**Prompt**: Create a new `Footer.tsx` component with:
- YIT (Yediot Information Technology) branding
- "Powered by yit" text
- Professional footer styling
- Responsive design using existing Tailwind breakpoints

**File**: `src/components/Footer.tsx`

### Step 16: Integrate Quote & Footer
**Prompt**: Update `src/App.tsx` to:
- Import Quote and Footer components
- Place them in proper order in the layout
- Ensure proper spacing and flow
- Maintain responsive design

**File**: `src/App.tsx`

### Step 17: Add Social Sharing Functionality
**Prompt**: Implement social sharing UI in Quote component:
- Facebook, Twitter, WhatsApp sharing buttons
- Copy link functionality
- Proper Hebrew text and RTL support
- Responsive design using existing Tailwind breakpoints

**File**: `src/components/Quote.tsx`

### Step 18: Final Polish & Responsiveness
**Prompt**: Final review and polish:
- Test all responsive breakpoints using existing Tailwind classes
- Ensure proper Hebrew typography throughout
- Verify all data tables match Figma exactly
- Test social sharing functionality
- Ensure proper image loading and fallbacks

**Files**: All component files

---

## Implementation Order Summary

1. **Phase 1 (Steps 1-5)**: Header & Hero - Foundation and visual impact
2. **Phase 2 (Steps 6-12)**: Data Tables - Core functionality and content
3. **Phase 3 (Steps 13-18)**: Visual Polish & Footer - Final touches and integration

## File Structure After Implementation

```
src/
├── components/
│   ├── Header.tsx (NEW)
│   ├── Hero.tsx (NEW)
│   ├── MunicipalityTable.tsx (NEW)
│   ├── TopCitiesTable.tsx (NEW)
│   ├── TransportationStats.tsx (NEW)
│   ├── EducationalClustersTable.tsx (NEW)
│   ├── Quote.tsx (NEW)
│   ├── Footer.tsx (NEW)
│   ├── Report.tsx (UPDATED)
│   ├── Map.tsx (EXISTING)
│   ├── SchoolSelect.tsx (EXISTING)
│   ├── VisionZero.tsx (EXISTING)
│   ├── Stats.tsx (REPLACED)
│   └── Graph.tsx (EXISTING)
├── types.ts (UPDATED)
├── App.tsx (UPDATED)
└── index.css (UPDATED with Moses font)
```

## Questions for Clarification

1. **Font Files**: Where should I place the Moses font files? (`/public/fonts/` or `/src/assets/fonts/`?)
2. **Image Optimization**: Should I implement lazy loading for the large background images?
3. **Data Updates**: How often should the static data be updated to reflect current statistics?
4. **Accessibility**: Any specific accessibility requirements for Hebrew text and RTL layout?

## Next Steps
After completing Phase 1, we'll proceed with:
- **Phase 2**: Data Tables & Statistics (Steps 6-12)
- **Phase 3**: Visual Elements & Footer (Steps 13-18)
