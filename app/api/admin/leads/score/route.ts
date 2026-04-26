import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { leadId, details } = await req.json();

    if (!leadId || !details) {
      return NextResponse.json({ error: 'Missing leadId or details' }, { status: 400 });
    }

    // Mock AI Scoring Logic (Simulating Claude Sonnet 3.5)
    // In production, we'd pass details to Anthropic SDK
    const intentSignals = details.intent || '';
    const budget = details.budget || 0;
    
    let score = 50; // Base score
    let rationale = [];

    if (intentSignals.includes('site survey')) {
      score += 30;
      rationale.push('Explicit request for site survey indicates high intent.');
    } else if (intentSignals.includes('price')) {
      score += 10;
      rationale.push('Pricing inquiry shows active research phase.');
    }

    if (budget > 1500000) { // £15k
      score += 15;
      rationale.push('Budget exceeds average order value (AOV) for Lumerra.');
    }

    // Caps
    score = Math.min(100, score);

    return NextResponse.json({
      leadId,
      score,
      rationale: rationale.length > 0 ? rationale.join(' ') : 'Standard lead profile.',
      urgency: score > 80 ? 'High' : 'Normal',
      scoredAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('AI Scoring Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
