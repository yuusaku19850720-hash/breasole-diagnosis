"use client";

import { useState } from "react";
import { amazonUrl, emptyScores, getRankedTypes, getRiskRank, getTotalScore, questions, results, selfCheckOptions, type Scores, type TypeId } from "@/data/diagnosis";
import { trackEvent } from "@/lib/analytics";

type Screen = "intro" | "question" | "result";

const Check = () => <span className="check">✓</span>;

export default function Home() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Scores>(emptyScores);
  const [resultId, setResultId] = useState<TypeId>("lowArch");
  const [subResultId, setSubResultId] = useState<TypeId>("standingFatigue");
  const [totalScore, setTotalScore] = useState(0);

  const answer = (yes: boolean) => {
    const next = { ...scores };
    if (yes) {
      Object.entries(questions[index].scores).forEach(([id, point]) => {
        next[id as TypeId] += point ?? 0;
      });
    }
    setScores(next);
    if (index === questions.length - 1) {
      const ranked = getRankedTypes(next);
      const completedTotal = getTotalScore(next);
      setResultId(ranked[0]);
      setSubResultId(ranked[1]);
      setTotalScore(completedTotal);
      trackEvent("complete_diagnosis", {
        result_type: ranked[0],
        sub_type: ranked[1],
        total_score: completedTotal,
      });
      setScreen("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIndex(index + 1);
    }
  };

  const restart = () => {
    setScreen("intro");
    setIndex(0);
    setScores(emptyScores());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <div className="shell">
        {screen === "intro" && <Intro start={() => setScreen("question")} />}
        {screen === "question" && <Question index={index} answer={answer} />}
        {screen === "result" && <Result id={resultId} subId={subResultId} total={totalScore} restart={restart} />}
        <footer>本診断は健康状態の目安を知るためのもので、医療行為ではありません。<br />痛みや違和感が続く場合は医療機関へご相談ください。</footer>
      </div>
    </main>
  );
}

function Intro({ start }: { start: () => void }) {
  const startDiagnosis = () => {
    trackEvent("start_diagnosis");
    start();
  };

  return <section className="card intro">
    <p className="eyebrow">あなたの足の状態をチェック</p>
    <h1><em>無料足診断</em></h1>
    <p className="lead">あなたの足の状態を<br className="mobile" />1分でチェックできます</p>
    <div className="features">
      {["全10問", "登録不要", "すぐ結果"].map(x => <div key={x}><Check />{x}</div>)}
    </div>
    <button onClick={startDiagnosis} className="primary">無料診断をはじめる <span>→</span></button>
  </section>;
}

function Question({ index, answer }: { index: number; answer: (yes: boolean) => void }) {
  const progress = Math.round(((index + 1) / questions.length) * 100);
  return <section>
    <div className="question-head">
      <div><small>QUESTION</small><strong>Q{index + 1} <span>/ {questions.length}</span></strong></div>
      <b>{progress}%</b>
    </div>
    <div className="bar"><i style={{ width: `${progress}%` }} /></div>
    <div className="card question-card">
      <h2>{questions[index].text}</h2>
      <button onClick={() => answer(true)} className="primary">はい <span>→</span></button>
      <button onClick={() => answer(false)} className="secondary">いいえ</button>
    </div>
    <p className="hint">直感でお答えください</p>
  </section>;
}

function Result({ id, subId, total, restart }: { id: TypeId; subId: TypeId; total: number; restart: () => void }) {
  const result = results[id];
  const subResult = results[subId];
  const risk = getRiskRank(total);
  const [selfCheck, setSelfCheck] = useState("");
  const selfCheckResult = selfCheckOptions.find((option) => option.id === selfCheck);
  const openAmazon = () => {
    let navigating = false;
    const navigate = () => {
      if (navigating) return;
      navigating = true;
      window.location.href = amazonUrl;
    };
    trackEvent("click_amazon", {
      result_type: id,
      risk_rank: risk.rank,
      event_callback: navigate,
      event_timeout: 800,
    });
    window.setTimeout(navigate, 900);
  };
  return <section className="card result">
    <div className="risk-card">
      <span>あなたの足の危険度</span>
      <strong>{risk.rank}<small>ランク</small></strong>
      <b>{risk.label}</b>
      <em>合計 {total}点</em>
    </div>
    <div className="result-top">
      <span className="result-label">診断結果</span>
      <p>あなたは</p><h1>{result.name}</h1>
      <p className="sub-result">{subResult.name}の傾向もあります</p>
      <div className="risk-comment"><strong>{risk.title}</strong><span>{risk.comment}</span></div>
      <div className="description">{result.description}</div>
    </div>
    <ResultList title="考えられる症状" items={result.symptoms} />
    <ResultList title="おすすめセルフケア" items={result.care} />
    <p className="support-text">{result.supportText}</p>
    <div className="self-check">
      <span>さらに詳しくチェック</span>
      <h2>片足つま先立ちはできますか？</h2>
      {selfCheckOptions.map((option) =>
        <button key={option.id} onClick={() => setSelfCheck(option.id)} className={selfCheck === option.id ? "selected" : ""}>
          <i>{selfCheck === option.id ? "✓" : ""}</i>{option.label}
        </button>
      )}
      {selfCheckResult && <div className="self-check-feedback">
        <strong>{selfCheckResult.title}</strong>
        <p>{selfCheckResult.comment}</p>
        <b>今日からできること</b>
        <p>{selfCheckResult.practice}</p>
        <small>転倒しないよう、必ず安定した支えの近くで行ってください。痛みや強い違和感がある場合は中止してください。</small>
      </div>}
    </div>
    <div className="cta">
      <strong>毎日の歩行を、もっと快適に。</strong>
      <button onClick={openAmazon} className="primary">{result.cta} <span>→</span></button>
      <small>Amazonの商品ページへ移動します</small>
    </div>
    <button onClick={restart} className="restart">もう一度診断する</button>
  </section>;
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  return <div className="result-list"><h2>{title}</h2><ul>{items.map(x => <li key={x}><Check />{x}</li>)}</ul></div>;
}
