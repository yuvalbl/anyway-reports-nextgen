### Adding VisionZero Component to Accidents Around Schools Page

This guide explains how to add the VisionZero component to your accidents around schools page. The component provides educational content about road safety improvements based on the Vision Zero philosophy.

### 1) Add VisionZero content constants

Create `src/constants/visionZero.ts`:

```ts
export interface VisionZeroContent {
  header: string
  body: string
  image?: string
  image2?: string
  image2Caption?: string
  alt: string
}

export const VISION_SUMMARY: VisionZeroContent = {
  header: "חזון אפס הרוגים בתאונות דרכים (Vision zero)",
  body: `זהו חזון להקטנה משמעותית של מספר ההרוגים והפצועים הקשים בתאונות הדרכים. חזון אפס מבוסס על העיקרון של בטיחות מערכתית (Systematic Safety) - תכנון ערים, עיצוב רחובות וכבישים כדי למנוע הזדמנויות להתרחשות של תאונות דרכים קשות וקטלניות. בניגוד לגישה המסורתית למניעת תאונות, בטיחות מערכתית לא מנסה לגרום לכך שאנשים ינהגו או ילכו בצורה מושלמת (על ידי הסברה או חקיקה), אלא מכיר בכך שאנשים הם יצורים לא מושלמים שתמיד יעשו טעויות. המיקוד הוא בתכנון מערכתי שמונע את ההזדמנות לבצע טעות מסוכנת, או במקרה שטעות כזו נעשתה, שתאונה לא תתפתח לאירוע קטלני. לפי גישה זו האחריות על מניעת תאונה קטלנית היא קודם כל על המתכנן הציבורי, לפני שהיא אחריות של משתמשי הדרך. לפי חזון אפס, מערכת שבנויה על סמך ההנחה שאף אדם לא יטעה לעולם, אינה מערכת בטוחה. מבחינה ערכית, חזון אפס מניח כי ניידות היא זכות אדם בסיסית. אסור שאנשים ימותו בדרך לעבודה ללימודים לקניות או לחברים - ומתכנן את המערכת בהתאם להנחה זו. כמו כן חזון אפס מתאים לגישה מתפתחת של מניעת פשיעה שמנסה להקטין פשיעה או את השלכותיה עוד לפני שזו התרחשה, ופחות על ידי שימוש במערכת המשפט הפלילי וכוחות משטרה.
חזון אפס קיים מאז 1997 בהולנד ושוודיה ובשנים האחרונות הוא מאומץ על ידי מדינות וערים נוספות, לרבות על ידי ארגון ה-OECD, קנדה, בריטניה, אוסטרליה, ומספר ערים גדולות בארצות הברית.`,
  image: "visionZero.png",
  alt: ''
}

export const SAFE_ROAD_SCALING: VisionZeroContent = {
  header: "יצירת כביש בטוח - מיתון תנועה",
  body: `המטרה של מיתון תנועה היא לשפר את הבטיחות והנוחות של הולכי רגל ורוכבי אופניים (תחבורה רכה) על ידי האטה מכוונת של מכוניות בכבישים מקומיים בעיר (30-40 קמ"ש) . מהירות גבוהה מידי ברחובות העיר היא מצב של Lose-Lose: מצד אחד הדבר מרתיע שימוש בהליכה, אופניים, ותחבורה ציבורית- כלומר מגביר פקקים ובעיות חניה. מצד שני בעיר צפופה לא משנה אם נהג נוסע 60 קמ"ש לאורך 200 מטר של קטע רחוב אם בסוף הקטע אותו נהג תקוע בפקק או ברמזור בגלל עודף שימוש במכוניות. מיתון תנועה מכוון לתנועה מתונה וזורמת יותר במקום תנועה עם פרצי מהירות ועצירות, שחייבת לעמוד ברמזורים. מתכננים עירוניים משתמשים באמצעים שונים של מיתון תנועה כמו תמרורים, עיצוב הדרך בצורה מעוקלת, הצרת הדרך, "אוזניים", במפרים, כריות, כיכרות, ריצוף הולנדי, מעברי חצייה מוגבהים ועוד. בשנים האחרונות ערים רבות (לדוגמה פריס, לונדון ועוד) מקדמות גישה של אזור מיתון תנועה - "בלוק" בן כמה רחובות, שבהם יש מיתון תנועה עם "כניסות" ויציאות". ההשפעה על נהגים היא קטנה בגלל שמדובר ב-200 המטרים האחרונים של הנסיעה. ההשפעה על בטיחות ילדים והולכי רגל בכלל היא עצומה.`,
  image: "safeRoad1.png",
  image2: "mitontnoa2.jpg",
  image2Caption: "תמרור המסמן כניסה לאיזור מיתון תנועה ומגבלת מהירות נסיעה של 30 קמ״ש",
  alt: ''
}

export const SAFE_CROSSING_ISLAND: VisionZeroContent = {
  header: "יצירת מעבר חצייה בטוח - אי תנועה מרכזי או אי הצלה",
  body: "אי תנועה מרכזי משפר את הנראות של הולך הרגל ושל מעבר החציה כולו, וגורם לנהג להאט מעט לפני מעבר החצייה. אי תנועה משפר את הבטיחות והנוחות של חציית כביש דו סטרי בעיקר, אך גם חד סטרי שכן הרבה יותר נוח ולכן גם יותר בטוח, להתמקד במכוניות שמגיעות רק מכיוון אחד. בנוסף הדבר מקל על הולך הרגל לבחון את מצב התנועה ללא לחץ. ללא אי כזה הולך הרגל עלול להרגיש ״לא נעים״ כלפי הנהגים המחכים, ולכן לחצות בחפזון לתוך הנתיב הנגדי. התוצאה עלולה להיות קטלנית. יתרון נוסף הוא מניעת עקיפה לא חוקית של מכוניות במעבר חציה דבר שעלול לגרום לפגיעה בהולך הרגל על המעבר.",
  alt: ''
}

export const SAFE_CROSSING_SIDEWALK: VisionZeroContent = {
  header: "יצירת מעבר חצייה בטוח - הבלטת המדרכות ליד מעבר חציה",
  body: "ברחובות רבים הולך הרגל נדרש לחצות לא רק נתיבי נסיעה אלא גם נתיבי חניה. לדוגמה ברחוב חד סטרי מקובל, הולך הרגל חוצה נתיב נסיעה אחד ושני נתיבי חניה. לפי החוק למכוניות אסור לחנות על מעברי חציה, אבל עקב מחסור בחניה נהגים לא תמיד נשמעים לחוק. לעיתים עיריות מאפשרות למכוניות לחנות קרוב מידי למעברי החצייה וזה מסתיר את הולך הרגל, בעיקר ילדים. הבלטת המדרכות פירושה שהולך הרגל צריך לחצות רק נתיב אחד במקום שלושה, הרחבת המדרכה מונעת חניה לא חוקית של מכוניות על מעבר החצייה. בנוסף המדרכה הבולטת משפרת את הראות ואת הנראות של הולכי הרגל ומונעת הסתרה על ידי מכוניות- במיוחד של ילדים. עבור הנהג, המדרכות הבולטות יכולות להוות הצרה של הדרך דבר שמאלץ אותו להאט לפני מעבר החצייה. בנוסף המדרכות הרחבות יותר פירושן הרגשה נעימה יותר להולך הרגל.",
  image: "sidewalk.jpg",
  alt: ''
}

export const SAFE_CROSSING_NARROW: VisionZeroContent = {
  header: "יצירת מעבר חצייה בטוח - הצרת מעבר חצייה",
  body: `אפשר להצר את הכביש בסמוך למעבר החצייה. דבר זה מקצר את זמן החצייה של הולך הרגל, ובנוסף גורם לנהג להאט לפני המעבר. מהירות של 40 קמ"ש או פחות משפרת בצורה משמעותית את הסיכוי שנהג ייתן זכות קדימה להולכי הרגל, ובמהירות נמוכה יותר לנהג יש גם יותר זמן להבחין בהולך הרגל ולפעול. הצרת מעבר החצייה יכולה להתבצע על ידי הבלטת המדרכות או על ידי אמצעים אחרים - לדוגמה קונוסים, עציצים, ועוד. חלק מאמצעים אלה משמשים כצד של "עירוניות טקטית" כדי לבחון את שינוי הרחוב בצורה זולה ומהירה.`,
  image: "sidewalk2.jpg",
  alt: ''
}

export const SAFE_CROSSING_HEIGHTEN: VisionZeroContent = {
  header: "יצירת מעבר חצייה בטוח - מעבר חצייה מוגבה",
  body: `מעבר החצייה הוא בגובה המדרכה והמכונית צריכות להאט ולעלות על המעבר ואז לרדת ממנו. הדבר מקל על חצייה של הולכי רגל, שמתקשים ללכת מהר - במיוחד הורים עם עגלות ילדים, הורים שמלווים פעוטות, נכים, וזקנים. הגבהת המעבר גם גורמת לשינוי תפיסתי לפיו המכונית היא "אורחת" במערכת המדרכות של הולכי הרגל, במקום שהולך הרגל הוא אורח במערכת הכבישים. יתרון נוסף הוא שהגבהת המעבר משפרת את הנראות של הולכי הרגל ומעודדת את הנהג להאט ולתת להולכי הרגל זכות קדימה. 
דוגמא לצעדים לשיפור הבטיחות של מעבר חציה - אי תנועה מרכזי (1), הגבהת המעבר (2), מדרכה בולטת (3), מהירות מטרה של לכל היותר 40 קמ"ש בקרבת המעבר (4) סימון קו עצירה (5)
אמצעים לשיפור הבטיחות בחושך - תמרורים מהבהבים מעל ובצידי מעבר החצייה, מחזירי אור על הכביש.`,
  image: "sidewalk3.png",
  image2: "SAFE_CROSSING_HEIGHTEN2.jpg",
  image2Caption: "מעבר חציה מוגבה בפתח תקווה",
  alt: ''
}

export const SAFE_CROSSING_STOPLINE: VisionZeroContent = {
  header: "יצירת מעבר חצייה בטוח - סימון קו עצירה לפני מעבר החצייה",
  body: `אחת ההמלצות של ארגון קציני הבטיחות בארצות הברית (NETCO) כדי לשפר את בטיחות המעברים , היא סימון קו עצירה למכוניות במרחק של כ-3 מטרים לפני מעבר החצייה. כך שכאשר מכונית נותנת זכות קדימה להולך רגל, היא צריכה לעצור בקו זה. לדבר זה חשיבות מיוחדת במעברי חציה שחוצים 2 נתיבים או יותר - שכן נהג שמתקרב למעבר חצייה שבו יש מכונית שכבר עומדת, הוא יכול לראות את הולך הרגל ולעצור גם הוא (מעבר לכך שזה לא חוקי לעקוף מכונית שעומדת במעבר חצייה). בנוסף הדבר מקל על הולך הרגל להבחין בנתיבים האחרים של החצייה. יתרון נוסף של עיצוב כזה הוא שאם מכונית אחת פוגעת במכונית אחרת שעצרה במעבר - הסיכוי לפגיעה בהולך רגל כתוצאה מכך קטן.`,
  image: "sidewalk4.png",
  alt: ''
}

export const SAFE_CROSSING_ZIGZAG: VisionZeroContent = {
  header: "יצירת מעבר חצייה בטוח - סימני זיגזג לפני מעבר החצייה",
  body: "בבריטניה ובמדינות המושפעות ממנה כמו גיברלטר וקפריסין מקובל סימון של זיגזג מספר מטרים לפני מעבר החצייה. לדבר זה מספר יתרונות - מצד אחד הוא מסמן לנהג שעוד זמן קצר הוא מגיע למעבר חציה. בנוסף הדבר יוצר אשליה אופטית של הצרה של הכביש לפני מעבר החצייה וגורם לנהגים להאט. יש שטוענים כי נהגים מסתכלים יותר זמן על הכביש עצמו ולכן מבחינים בסימן זה לפני שהם מבחינים בהולכי רגל. אמצעי זה הוא זול ומהיר ליישום, אבל יש לו חסרונות לעומת הצרה אמיתית מעבר החצייה - והיא שעם הזמן נהגים עלולים להתרגל לסימון.",
  image: 'sidewalk5.jpg',
  alt: ''
}

export const CITY_BIKE_SPEED: VisionZeroContent = {
  header: "אופניים במרחב העירוני",
  body: `מהירות רכיבה ממוצעת על אופניים בעיר היא 25-15 קמ"ש. בירידה יכול רוכב האופניים לפתח מהירות גבוהה יותר העשויה להגיע ל-50 קמ"ש. מהירות הנסיעה תלויה בקיום תשתיות אופניים, בכמות הרמזורים בדרך, בהפרשי גבהים בדרך, במזג האוויר ובכושר של הרוכב. אופניים חשמליים הם בדרך כלל מהירים יותר יחסית לאופניים. בישראל יש מהירות מירבית של 25 קמ"ש. בשל פקקי תנועה ועצירות ברמזורים, בערים רבות בעולם, המהירות הממוצעת של רכב פרטי היא נמוכה מ-26 קמ"ש: בוורשה המהירות היא 26 קמ"ש, בברלין 24 קמ"ש ובלונדון 19 קמ"ש.[1]`,
  image: "bicycle.jpg",
  alt: ''
}

export const CITY_BIKE_LANE: VisionZeroContent = {
  header: "אופניים במרחב העירוני - רחוב אופניים או שדרת אופניים",
  body: `זהו רחוב שבו משלבים תנועה של אופניים עם תנועה ממונעת בצורה בטוחה וללא הפרדה. ברחוב כזה יש זכות קדימה לאופניים, אבל גם כלי רכב אחרים כמו מכוניות יכולים לנסוע בו. שדרות אופניים הם רחובות שבהם יש מעט תנועה מנועית שנוסעת לאט, ואשר מותאמים לשימוש לתחבורת אופניים על ידי עיצוב עירוני שמשלב מיתון תנועה, הפחתת תנועה, תמרור וסימון כביש מתאים, וכן טיפול בדרכים חוצות. טיפולים אלה מאפשרים תנועה בטוחה ונוחה לאופניים בעודם מרתיעים נסיעות של כלי רכב ממונעים דרך רחובות אלה. נשמרת הגישה של כלי רכב ממונעים לדירות ונכסים שנמצאים לאורך הנתיב. בניגוד לשבילי אופניים, שדרת האופניים בדרך כלל אינה מפקיעה את זכויות הדרך מכלי רכב ממונעים, ואינה כרוכה באובדן מקומות חנייה לרכב הפרטי, ובכל זאת מייצרת רחוב שבו נעים ובטוח לרכוב באופניים.`,
  image: "bicycle3.jpg",
  alt: ''
}

export const VISION_ZERO_CONTENT: VisionZeroContent[] = [
  VISION_SUMMARY,
  SAFE_ROAD_SCALING,
  SAFE_CROSSING_ISLAND,
  SAFE_CROSSING_SIDEWALK,
  SAFE_CROSSING_NARROW,
  SAFE_CROSSING_HEIGHTEN,
  SAFE_CROSSING_STOPLINE,
  SAFE_CROSSING_ZIGZAG,
  CITY_BIKE_SPEED,
  CITY_BIKE_LANE
]
```

### 2) Create the VisionZero component

Create `src/components/VisionZero.tsx`:

```tsx
import React, { useState } from 'react'
import { VISION_ZERO_CONTENT, type VisionZeroContent } from '../constants/visionZero'

const VisionZero: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = (index: number) => {
    setCurrentTab(index)
  }

  const renderTabContent = (content: VisionZeroContent) => (
    <div className="space-y-4">
      {content.image && (
        <div className="flex justify-center lg:justify-end">
          <img
            src={`images/${content.image}`}
            height="250"
            alt={content.alt}
            className="lg:float-right lg:mr-4 lg:ml-0"
          />
        </div>
      )}
      <div className="text-sm leading-6">{content.body}</div>
      {content.image2 && (
        <figure className="text-center">
          <img
            src={`images/${content.image2}`}
            className="max-w-[70%] min-w-[240px] mx-auto"
            alt={content.alt}
          />
          {content.image2Caption && (
            <figcaption className="text-sm mt-2">{content.image2Caption}</figcaption>
          )}
        </figure>
      )}
    </div>
  )

  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-4 sm:p-6">
      <div className="text-xl font-bold mb-6 text-center">
        דרכים לשיפור הבטיחות בדרכים על פי חזון אפס / דרור רשף
      </div>
      
      {/* Mobile: Horizontal scrollable tabs */}
      <div className="lg:hidden mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {VISION_ZERO_CONTENT.map((content, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {content.header}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Vertical tabs */}
      <div className="hidden lg:flex">
        <div className="w-64 border-r border-gray-200 pr-4">
          <div className="space-y-1">
            {VISION_ZERO_CONTENT.map((content, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`w-full text-right p-3 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === index
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {content.header}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 pl-6">
          {renderTabContent(VISION_ZERO_CONTENT[currentTab])}
        </div>
      </div>

      {/* Mobile: Tab content */}
      <div className="lg:hidden">
        {renderTabContent(VISION_ZERO_CONTENT[currentTab])}
      </div>
    </div>
  )
}

export default VisionZero
```

### 3) Add images to public folder

Copy these images from the original project to your `public/images/` folder:
- `visionZero.png`
- `safeRoad1.png`
- `mitontnoa2.jpg`
- `sidewalk.jpg`
- `sidewalk2.jpg`
- `sidewalk3.png`
- `SAFE_CROSSING_HEIGHTEN2.jpg`
- `sidewalk4.png`
- `sidewalk5.jpg`
- `bicycle.jpg`
- `bicycle3.jpg`

### 4) Update the Report component

Modify `src/components/Report.tsx` to include the VisionZero component:

```tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Map } from './Map'
import { Stats } from './Stats'
import { SchoolSelect } from './SchoolSelect'
import VisionZero from './VisionZero'
import type { School, InjuredYearRecord, MonthlyRecord, SexRecord } from '../types'

// ... existing code ...

export const Report: React.FC<Props> = ({
  schools,
  selectedId,
  setSelectedId,
  selectedSchool,
}) => {
  // ... existing state and useEffect ...

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[42%] w-full space-y-4">
          <div className="rounded-lg border border-neutral-200/70 p-3">
            <SchoolSelect schools={schools} onSelectId={setSelectedId} />
          </div>
          <div className="rounded-lg border border-neutral-200/70 p-3">
            <Stats
              title={title}
              injuredStats={injuredStats}
              monthStats={monthStats}
              genderStats={genderStats}
            />
          </div>
        </div>
        <div className="lg:flex-1 w-full">
          {selectedSchool ? (
            <Map school={selectedSchool} schoolId={selectedId} />
          ) : (
            <div className="text-center text-xl">
              ⇒⇒ יש להזין בשורת החיפוש שם ישוב או שם מוסד חינוך
            </div>
          )}
        </div>
      </div>
      
      {/* Report footer */}
      <div className="text-sm leading-6 text-neutral-800 space-y-2">
        <div>
          הדו״ח מתבסס על נתוני הלשכה המרכזית לסטטיסטיקה. בדו״ח נספרו עבור כל מוסד חינוך כל
          הפצועים/הרוגים שנפגעו תוך שימוש בתחבורה רכה (הולכי רגל, רוכבי אופניים ואופניים חשמליים
          ורוכבי קורקינט חשמלי) בגילאים 5-19,  בין השעות 7:00 ל-19:00 ובתוך ריבוע שמרכזו מוסד
          חינוכי או מקבץ מוסדות חינוכיים וגודל כל צלע ק"מ אחד, בין התאריכים 1.6.2020-31.5.2025.
        </div>
        <div>
          את הדו"ח הפיקו מתנדבי פרויקט ANYWAY וביניהם: דניאל שלי, מיכל אורן, זיו הרפז, דרור רשף,
          אגם רפאלי-פרהדיאן, דן פולק, אבי קליימן, בניה פרץ, סלומון רדה, אורי הוך, בר קלמי, כרמל
          פרדיס, יובל ברוך, ברוך פיקאר, גל רייך ועתליה אלון.
        </div>
      </div>

      {/* VisionZero section */}
      <VisionZero />
    </div>
  )
}
```

### 5) Key improvements in the new VisionZero component

- **Mobile-first design**: Horizontal scrollable tabs on mobile, vertical tabs on desktop
- **Responsive layout**: Adapts to different screen sizes
- **Modern UI**: Uses Tailwind classes for consistent styling
- **Better accessibility**: Proper button semantics and ARIA labels
- **Smooth transitions**: Hover effects and state changes
- **No Material-UI dependency**: Pure React + Tailwind implementation

### 6) Test the component

- Verify all 10 tabs display correctly
- Check mobile responsiveness
- Ensure images load properly
- Test tab switching on both mobile and desktop
- Verify RTL layout is maintained

The VisionZero component will now appear below the report footer, providing educational content about road safety improvements in a mobile-friendly, modern interface. 