# Typography System Implementation

## Overview
This document describes the comprehensive typography system implemented for the "בטיחות הילדים ליד בתי ספר" (Children's Safety Near Schools) report, based on the Figma design specifications.

## Files Created/Modified

### 1. `src/lib/utils.ts`
- **Purpose**: Utility function for merging CSS classes
- **Function**: `cn()` - Combines class names and filters out falsy values
- **Dependencies**: None (pure JavaScript)

### 2. `src/components/Typography.tsx`
- **Purpose**: Main typography component with all variants
- **Exports**: 
  - `Typography` (base component)
  - `HeroTitle`, `HeroSubtitle`, `MainContent`, `TableHeader`, `TableBody`, `TableCaption` (specific components)

### 3. `src/components/Hero.tsx` (Updated)
- **Changes**: Replaced inline styles with `HeroTitle` and `HeroSubtitle` components
- **Result**: Cleaner code, consistent typography, responsive design

### 4. `src/components/Report.tsx` (Updated)
- **Changes**: Replaced basic text styling with `MainContent` component
- **Result**: Consistent typography for main content area

### 5. `src/components/TypographyShowcase.tsx`
- **Purpose**: Demo component showing all typography variants (can be removed in production)
- **Usage**: Useful for development and testing

## Typography Specifications

### Hero Typography

#### Hero Title
- **Desktop**: 82px, weight 660, line-height 0.92, letter-spacing -2%
- **Mobile**: 35px, weight 660, line-height 0.92, letter-spacing -2%
- **Font**: Moses Display
- **Usage**: Main headline in hero section

#### Hero Subtitle
- **Desktop**: 23px, weight 470, line-height 1.4, letter-spacing -0.5%
- **Mobile**: 18px, weight 470, line-height 1.4, letter-spacing -0.5%
- **Font**: Moses Display
- **Usage**: Supporting text below hero title

### Main Content Typography

#### Main Content
- **Desktop**: 20px, weight 400, line-height 1.5, letter-spacing -0.5%
- **Mobile**: 18px, weight 400, line-height 1.5, letter-spacing -0.5%
- **Font**: Moses Text
- **Usage**: Primary content text below the map

### Table Typography

#### Table Header
- **Desktop**: 18px, weight 600, line-height 1.3, letter-spacing -0.5%
- **Mobile**: 16px, weight 600, line-height 1.3, letter-spacing -0.5%
- **Font**: Moses Text
- **Usage**: Column headers in data tables

#### Table Body
- **Desktop**: 16px, weight 400, line-height 1.4, letter-spacing -0.5%
- **Mobile**: 14px, weight 400, line-height 1.4, letter-spacing -0.5%
- **Font**: Moses Text
- **Usage**: Data cells in tables

#### Table Caption
- **Desktop**: 14px, weight 400, line-height 1.3, letter-spacing -0.5%
- **Mobile**: 12px, weight 400, line-height 1.3, letter-spacing -0.5%
- **Font**: Moses Text
- **Usage**: Table descriptions and footnotes

## Responsive Behavior

The typography system automatically adjusts between mobile and desktop breakpoints:
- **Mobile**: Default (375px and below)
- **Desktop**: `md:` breakpoint and above (800px+)
- **Breakpoint**: Uses Tailwind's `md:` prefix for responsive design

## Usage Examples

### Basic Usage
```tsx
import { HeroTitle, HeroSubtitle, MainContent } from './Typography'

// Hero section
<HeroTitle>בדקו וגלו: אלו הדרכים המסוכנות בדרך לבית הספר שלכם</HeroTitle>
<HeroSubtitle>2,587,000 תלמידים וילדי גן יפתחו את שנת הלימודים</HeroSubtitle>

// Main content
<MainContent>דוח ANYWAY מבית "נתון לשינוי" ובשיתוף "אור ירוק"...</MainContent>
```

### Advanced Usage
```tsx
import { Typography } from './Typography'

// Custom element and additional classes
<Typography 
  variant="main-content" 
  as="div" 
  className="text-center mb-4"
>
  Custom styled content
</Typography>
```

### Table Usage
```tsx
import { TableHeader, TableBody, TableCaption } from './Typography'

<table>
  <thead>
    <tr>
      <TableHeader>עיר</TableHeader>
      <TableHeader>אחוז שינוי</TableHeader>
    </tr>
  </thead>
  <tbody>
    <tr>
      <TableBody>ירושלים</TableBody>
      <TableBody>-21%</TableBody>
    </tr>
  </tbody>
  <TableCaption>נתוני השוואה בין ערים</TableCaption>
</table>
```

## Font Families

- **Moses Display**: Used for hero titles and subtitles
- **Moses Text**: Used for main content and table text
- **Fallback**: System fonts for better performance

## Key Features

1. **Responsive Design**: Automatically switches between mobile and desktop sizes
2. **Font Families**: Moses Display for hero text, Moses Text for content
3. **Semantic HTML**: Support for different HTML elements via the `as` prop
4. **RTL Support**: Proper Hebrew text direction and alignment
5. **Tailwind Integration**: Works seamlessly with existing Tailwind classes
6. **Type Safety**: Full TypeScript support with proper interfaces

## Implementation Details

### CSS-in-JS Approach
The component uses a hybrid approach:
- **Tailwind Classes**: For responsive breakpoints and basic styling
- **Inline Styles**: For precise typography specifications (font-weight, line-height, letter-spacing)

### Responsive Implementation
```tsx
// Mobile styles (default)
variantStyles.mobile,

// Desktop styles (md: breakpoint and up)
variant === 'hero-title' && "md:text-[82px]",
variant === 'hero-subtitle' && "md:text-[23px]",
// ... etc
```

### Font Weight Handling
```tsx
fontWeight: variant.startsWith('hero') ? 
  (variant === 'hero-title' ? 660 : 470) : 
  (variant === 'table-header' ? 600 : 400)
```

## Testing

The typography system has been tested with:
- ✅ TypeScript compilation
- ✅ Component rendering
- ✅ Responsive breakpoints
- ✅ Font loading
- ✅ RTL text direction

## Future Enhancements

1. **CSS Custom Properties**: Could be moved to CSS variables for better performance
2. **Theme Support**: Could be extended to support different design themes
3. **Animation**: Could add smooth transitions between breakpoints
4. **Accessibility**: Could add ARIA labels and screen reader support

## Conclusion

The typography system is now fully implemented and integrated into the application. It provides:
- Consistent typography across all components
- Exact match to Figma design specifications
- Responsive design for mobile and desktop
- Clean, maintainable code structure
- Full TypeScript support

The system is ready for production use and can be easily extended for future typography needs. 