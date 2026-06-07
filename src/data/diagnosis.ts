export const typeIds = ["lowArch", "transverseArch", "toeFunction", "standingFatigue"] as const;
export type TypeId = (typeof typeIds)[number];
export type Scores = Record<TypeId, number>;

export const amazonUrl = "https://amazon.co.jp/bracesole";

export const questions = [
  { text: "夕方になると足が疲れやすいですか？", scores: { standingFatigue: 2, lowArch: 1 } },
  { text: "足裏が痛くなることがありますか？", scores: { lowArch: 2 } },
  { text: "椅子に座っている時より、立った時の方が土踏まずがかなり低くなる気がしますか？", scores: { lowArch: 2 } },
  { text: "立った状態で足を見ると、土踏まずがほとんど見えなくなりますか？", scores: { lowArch: 2 } },
  { text: "靴底の外側（小指側）が先にすり減ることが多いですか？", scores: { lowArch: 2, toeFunction: 1 } },
  { text: "親指の付け根が出っ張っていますか？", scores: { transverseArch: 2 } },
  { text: "親指の付け根が痛むことがありますか？", scores: { transverseArch: 2 } },
  { text: "幅の狭い靴が辛いと感じますか？", scores: { transverseArch: 2 } },
  { text: "足指でタオルを掴むのが苦手ですか？", scores: { toeFunction: 2 } },
  { text: "足の指が浮いている気がしますか？", scores: { toeFunction: 2 } },
  { text: "片足立ちを10秒続けるとグラグラしやすいですか？", scores: { toeFunction: 2, lowArch: 1 } },
  { text: "長時間立つとふくらはぎが張りますか？", scores: { standingFatigue: 2 } },
  { text: "朝より夕方の方が靴がきつく感じますか？", scores: { standingFatigue: 2 } },
] satisfies { text: string; scores: Partial<Scores> }[];

export const results = {
  lowArch: {
    name: "アーチ低下タイプ",
    description: "土踏まずは歩行時の衝撃を吸収するクッションの役割をしています。アーチが低下すると足裏だけでなく、膝や腰にも負担が伝わりやすくなります。",
    symptoms: ["足裏への負担", "膝や腰への負担", "歩行時の疲れ"],
    care: ["かかと上げ運動", "足指グーパー", "足首回し"],
    supportText: "また、立ち仕事や長時間歩くことが多い方は、足への負担を減らすためにアーチを支えるサポートを取り入れるのも一つの方法です。",
    cta: "アーチサポートについて見る",
  },
  transverseArch: {
    name: "横アーチ低下タイプ",
    description: "足の横幅を支えるアーチが低下すると、前足部に負担が集中しやすくなります。",
    symptoms: ["外反母趾", "足指の変形", "前足部の疲れ"],
    care: ["足指ストレッチ", "足指じゃんけん", "指を広げる運動"],
    supportText: "さらに、前足部への負担を減らすために、足のアーチをサポートする方法もあります。",
    cta: "足への負担を減らす方法を見る",
  },
  toeFunction: {
    name: "足指機能低下タイプ",
    description: "足指は歩く時のバランスや推進力を支えています。足指がうまく使えない状態が続くと、歩行時の安定性に影響することがあります。",
    symptoms: ["疲れやすい", "ふらつきやすい", "足の外側に体重が逃げる"],
    care: ["タオルギャザー", "足指じゃんけん", "裸足での足指運動"],
    supportText: "また、足指が使いやすい環境を作ることも大切です。",
    cta: "足指を使いやすくするサポートを見る",
  },
  standingFatigue: {
    name: "立ち仕事疲労タイプ",
    description: "足そのものの機能低下よりも、毎日の負担が蓄積している可能性があります。",
    symptoms: ["足裏の疲労", "ふくらはぎの張り", "むくみ"],
    care: ["足首回し", "ストレッチ", "かかと上げ運動"],
    supportText: "また、長時間の立位による負担を減らす工夫も大切です。",
    cta: "立ち仕事の負担対策を見る",
  },
} satisfies Record<TypeId, {
  name: string;
  description: string;
  symptoms: string[];
  care: string[];
  supportText: string;
  cta: string;
}>;

export const riskRanks = [
  { rank: "A", min: 0, label: "現在大きな問題は見られません", title: "現在の足の状態は良好です", comment: "現在大きな問題は見られません。" },
  { rank: "B", min: 5, label: "軽度の機能低下", title: "軽度の機能低下が見られます", comment: "今のうちにケアを始めることをおすすめします。" },
  { rank: "C", min: 9, label: "注意レベル", title: "注意が必要な状態です", comment: "放置すると足裏痛や膝痛につながる可能性があります。" },
  { rank: "D", min: 13, label: "改善推奨", title: "改善をおすすめします", comment: "足の機能低下が進んでいる可能性があります。" },
  { rank: "E", min: 18, label: "高リスク", title: "高リスク状態です", comment: "できるだけ早めの対策をおすすめします。" },
] as const;

export const selfCheckOptions = [
  {
    id: "stable",
    label: "安定してできる",
    title: "バランスを保てています",
    comment: "今の状態を維持するために、無理のない範囲で足首や足指を動かす習慣を続けましょう。",
    practice: "壁や椅子の近くで、ゆっくりかかと上げを5回行ってみましょう。",
  },
  {
    id: "wobble",
    label: "少しふらつく",
    title: "バランスが少し不安定な傾向です",
    comment: "足首まわりや足指をうまく使えていない可能性があります。安全な場所で少しずつ練習しましょう。",
    practice: "椅子や壁に手を添え、両足のかかと上げをゆっくり5回行ってみましょう。",
  },
  {
    id: "unable",
    label: "できない",
    title: "まずは支えを使った運動から",
    comment: "無理に片足で行わず、安定した支えを使って両足で行うところから始めましょう。",
    practice: "椅子の背などにつかまり、両足のかかとを少し上げて戻す動作を無理のない範囲で行いましょう。",
  },
] as const;

export const emptyScores = (): Scores => ({ lowArch: 0, transverseArch: 0, toeFunction: 0, standingFatigue: 0 });
export const getTotalScore = (scores: Scores) => Object.values(scores).reduce((sum, score) => sum + score, 0);
export const getRiskRank = (total: number) => [...riskRanks].reverse().find((risk) => total >= risk.min) ?? riskRanks[0];
export const getRankedTypes = (scores: Scores) => [...typeIds].sort((a, b) => scores[b] - scores[a]);
