const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  HeadingLevel,
  WidthType,
  ShadingType,
  PageBreak,
} = require('docx');
const fs = require('fs');
const path = require('path');

const NAVY = '1B2A4A';
const ACCENT_BLUE = '2563EB';
const LIGHT_BLUE = 'EFF6FF';
const DARK_TEXT = '1E293B';
const GRAY_BORDER = 'E2E8F0';
const GREEN = '16A34A';
const AMBER = 'D97706';

function createCell(text, bold = false, color = DARK_TEXT, bg = 'FFFFFF', width = null) {
  return new TableCell({
    shading: { fill: bg, type: ShadingType.CLEAR },
    margins: { top: 120, bottom: 120, left: 150, right: 150 },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text,
            bold,
            color,
            font: 'Arial',
            size: 20,
          }),
        ],
      }),
    ],
    width: width ? { size: width, type: WidthType.DXA } : undefined,
  });
}

function createHeaderCell(text, width = null) {
  return new TableCell({
    shading: { fill: NAVY, type: ShadingType.CLEAR },
    margins: { top: 140, bottom: 140, left: 150, right: 150 },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text,
            bold: true,
            color: 'FFFFFF',
            font: 'Arial',
            size: 20,
          }),
        ],
      }),
    ],
    width: width ? { size: width, type: WidthType.DXA } : undefined,
  });
}

function generateReport() {
  const doc = new Document({
    sections: [
      // 1. Cover Page Section
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 2000, after: 300 },
            children: [
              new TextRun({
                text: 'unitconversionhub.com',
                bold: true,
                size: 56,
                color: NAVY,
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: 'SEO / GEO / AEO Comprehensive Audit Report',
                bold: true,
                size: 28,
                color: ACCENT_BLUE,
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 1000 },
            children: [
              new TextRun({
                text: 'FULL AUDIT • PRODUCTION WEBSITE READINESS',
                bold: true,
                size: 20,
                color: '64748B',
                font: 'Arial',
              }),
            ],
          }),

          // Score Summary Table
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: GREEN, type: ShadingType.CLEAR },
                    margins: { top: 200, bottom: 200, left: 200, right: 200 },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'SEO SCORE', bold: true, color: 'FFFFFF', size: 18, font: 'Arial' })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '8/10', bold: true, color: 'FFFFFF', size: 52, font: 'Arial' })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Strong', italics: true, color: 'FFFFFF', size: 18, font: 'Arial' })] }),
                    ],
                  }),
                  new TableCell({
                    shading: { fill: AMBER, type: ShadingType.CLEAR },
                    margins: { top: 200, bottom: 200, left: 200, right: 200 },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'GEO SCORE', bold: true, color: 'FFFFFF', size: 18, font: 'Arial' })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '7/10', bold: true, color: 'FFFFFF', size: 52, font: 'Arial' })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'On Track', italics: true, color: 'FFFFFF', size: 18, font: 'Arial' })] }),
                    ],
                  }),
                  new TableCell({
                    shading: { fill: GREEN, type: ShadingType.CLEAR },
                    margins: { top: 200, bottom: 200, left: 200, right: 200 },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'AEO SCORE', bold: true, color: 'FFFFFF', size: 18, font: 'Arial' })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '9/10', bold: true, color: 'FFFFFF', size: 52, font: 'Arial' })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Strong', italics: true, color: 'FFFFFF', size: 18, font: 'Arial' })] }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 2400 },
            children: [
              new TextRun({ text: 'Audit Date: October 4, 2026\nTarget Domain: https://unitconversionhub.com', color: '64748B', size: 18, font: 'Arial' }),
            ],
          }),

          new PageBreak(),
        ],
      },

      // 2. Executive Summary & Audit Body
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        children: [
          // Section: Executive Summary
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
            children: [new TextRun({ text: 'Executive Summary', bold: true, size: 36, color: NAVY, font: 'Arial' })],
          }),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR },
                    margins: { top: 150, bottom: 150, left: 150, right: 150 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'UnitConversionHub demonstrates strong technical search performance, featuring 144 pre-rendered static HTML pages, comprehensive JSON-LD schemas (FAQPage, BreadcrumbList, WebApplication), and instant formula tables. To achieve top Google rankings over rival unitconversionhub.com, immediate priorities include removing duplicate meta description tags in pre-rendered templates, establishing explicit E-E-A-T author entity schema, and ensuring pre-rendered HTML body fallbacks on Category Hub pages.',
                            size: 20,
                            color: DARK_TEXT,
                            font: 'Arial',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // Scores Summary Table
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 150 },
            children: [new TextRun({ text: 'Dimension Scorecard', bold: true, size: 26, color: NAVY, font: 'Arial' })],
          }),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Dimension', 2000),
                  createHeaderCell('Score', 1500),
                  createHeaderCell('Status', 1800),
                  createHeaderCell('Key Takeaway', 4060),
                ],
              }),
              new TableRow({
                children: [
                  createCell('SEO', true, DARK_TEXT, 'F8F9FA', 2000),
                  createCell('8/10', true, GREEN, 'F8F9FA', 1500),
                  createCell('Strong', false, DARK_TEXT, 'F8F9FA', 1800),
                  createCell('144 pre-rendered SSG pages & sitemap; fix duplicate head meta tags.', false, DARK_TEXT, 'F8F9FA', 4060),
                ],
              }),
              new TableRow({
                children: [
                  createCell('GEO', true, DARK_TEXT, 'FFFFFF', 2000),
                  createCell('7/10', true, AMBER, 'FFFFFF', 1500),
                  createCell('On Track', false, DARK_TEXT, 'FFFFFF', 1800),
                  createCell('High factual density; add sameAs brand links & named author profiles.', false, DARK_TEXT, 'FFFFFF', 4060),
                ],
              }),
              new TableRow({
                children: [
                  createCell('AEO', true, DARK_TEXT, 'F8F9FA', 2000),
                  createCell('9/10', true, GREEN, 'F8F9FA', 1500),
                  createCell('Strong', false, DARK_TEXT, 'F8F9FA', 1800),
                  createCell('Excellent FAQPage JSON-LD, structured tables, and snippet ready.', false, DARK_TEXT, 'F8F9FA', 4060),
                ],
              }),
            ],
          }),

          // Section: Pages Audited
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [new TextRun({ text: 'Pages Audited', bold: true, size: 32, color: NAVY, font: 'Arial' })],
          }),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('URL Route', 4000),
                  createHeaderCell('Page Type', 2500),
                  createHeaderCell('Pre-rendered Signals', 2860),
                ],
              }),
              new TableRow({
                children: [
                  createCell('/', false, DARK_TEXT, 'F8F9FA', 4000),
                  createCell('Homepage Hub', false, DARK_TEXT, 'F8F9FA', 2500),
                  createCell('Pre-rendered HTML, Title, Meta, JSON-LD', false, DARK_TEXT, 'F8F9FA', 2860),
                ],
              }),
              new TableRow({
                children: [
                  createCell('/length-converter', false, DARK_TEXT, 'FFFFFF', 4000),
                  createCell('Category Hub', false, DARK_TEXT, 'FFFFFF', 2500),
                  createCell('Pre-rendered Head, Breadcrumbs, Canonical', false, DARK_TEXT, 'FFFFFF', 2860),
                ],
              }),
              new TableRow({
                children: [
                  createCell('/convert/meters-to-feet', false, DARK_TEXT, 'F8F9FA', 4000),
                  createCell('High-Intent Pair', false, DARK_TEXT, 'F8F9FA', 2500),
                  createCell('Full Pre-rendered HTML, FAQ Schema, Table', false, DARK_TEXT, 'F8F9FA', 2860),
                ],
              }),
              new TableRow({
                children: [
                  createCell('/convert/kg-to-lbs', false, DARK_TEXT, 'FFFFFF', 4000),
                  createCell('High-Intent Pair', false, DARK_TEXT, 'FFFFFF', 2500),
                  createCell('Full Pre-rendered HTML, FAQ Schema, Table', false, DARK_TEXT, 'FFFFFF', 2860),
                ],
              }),
              new TableRow({
                children: [
                  createCell('/sitemap.xml', false, DARK_TEXT, 'F8F9FA', 4000),
                  createCell('XML Sitemap Index', false, DARK_TEXT, 'F8F9FA', 2500),
                  createCell('150 URLs with Priority & Lastmod', false, DARK_TEXT, 'F8F9FA', 2860),
                ],
              }),
            ],
          }),

          // Section: SEO Analysis
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [new TextRun({ text: 'SEO Analysis (Traditional Search)', bold: true, size: 32, color: NAVY, font: 'Arial' })],
          }),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [createHeaderCell('Signal', 2500), createHeaderCell('Finding & Observation', 5000), createHeaderCell('Status', 1860)],
              }),
              new TableRow({
                children: [
                  createCell('Title Tags', true, DARK_TEXT, 'F8F9FA', 2500),
                  createCell('Unique 50-60 character titles generated for all 144 static routes.', false, DARK_TEXT, 'F8F9FA', 5000),
                  createCell('Good', true, GREEN, 'F8F9FA', 1860),
                ],
              }),
              new TableRow({
                children: [
                  createCell('Meta Description', true, DARK_TEXT, 'FFFFFF', 2500),
                  createCell('Targeted descriptions present, but template contains duplicate fallback tag.', false, DARK_TEXT, 'FFFFFF', 5000),
                  createCell('Needs Attention', true, AMBER, 'FFFFFF', 1860),
                ],
              }),
              new TableRow({
                children: [
                  createCell('Canonical URLs', true, DARK_TEXT, 'F8F9FA', 2500),
                  createCell('Explicit rel="canonical" pointing to target https://unitconversionhub.com on all pages.', false, DARK_TEXT, 'F8F9FA', 5000),
                  createCell('Good', true, GREEN, 'F8F9FA', 1860),
                ],
              }),
              new TableRow({
                children: [
                  createCell('XML Sitemap', true, DARK_TEXT, 'FFFFFF', 2500),
                  createCell('Compliant sitemap.xml listing 150 indexable URLs with custom priority scores.', false, DARK_TEXT, 'FFFFFF', 5000),
                  createCell('Good', true, GREEN, 'FFFFFF', 1860),
                ],
              }),
            ],
          }),

          // Section: Priority Recommendations Matrix
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [new TextRun({ text: 'Priority Recommendations Matrix', bold: true, size: 32, color: NAVY, font: 'Arial' })],
          }),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Priority', 1800),
                  createHeaderCell('Issue / Optimization', 3500),
                  createHeaderCell('Dimension', 1500),
                  createHeaderCell('Impact', 2560),
                ],
              }),
              new TableRow({
                children: [
                  createCell('High', true, AMBER, 'F8F9FA', 1800),
                  createCell('Remove duplicate <meta name="description"> in HTML head template.', false, DARK_TEXT, 'F8F9FA', 3500),
                  createCell('SEO', false, DARK_TEXT, 'F8F9FA', 1500),
                  createCell('Prevents snippet selection confusion', false, DARK_TEXT, 'F8F9FA', 2560),
                ],
              }),
              new TableRow({
                children: [
                  createCell('Medium', true, AMBER, 'FFFFFF', 1800),
                  createCell('Unify WebApplication schema brand name to "UnitConversionHub".', false, DARK_TEXT, 'FFFFFF', 3500),
                  createCell('GEO', false, DARK_TEXT, 'FFFFFF', 1500),
                  createCell('Strengthens AI entity recognition', false, DARK_TEXT, 'FFFFFF', 2560),
                ],
              }),
              new TableRow({
                children: [
                  createCell('Quick Win', true, GREEN, 'F8F9FA', 1800),
                  createCell('Pre-render body HTML for Category Hub pages in scripts/prerender.ts.', false, DARK_TEXT, 'F8F9FA', 3500),
                  createCell('SEO / AEO', false, DARK_TEXT, 'F8F9FA', 1500),
                  createCell('Maximizes crawler text indexing', false, DARK_TEXT, 'F8F9FA', 2560),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const distDir = path.resolve(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const outputPath = path.join(distDir, 'seo-audit-unitconversionhub-com-2026-10-04.docx');
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(outputPath, buffer);
    console.log(`[AUDIT REPORT] Successfully written DOCX report to ${outputPath}`);
  });
}

generateReport();
