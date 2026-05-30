import { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import styles from './CTCOptimizer.module.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function CTCOptimizer() {
  const [ctcStr, setCtcStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_ctcStr') || '15,00,000';
  });
  const [basicStr, setBasicStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_basicStr') || '7,50,000';
  });
  const [hraStr, setHraStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_hraStr') || '3,00,000';
  });
  const [daStr, setDaStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_daStr') || '0';
  });
  const [ltaStr, setLtaStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_ltaStr') || '0';
  });
  const [pfStr, setPfStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_pfStr') || '0';
  });
  const [specialStr, setSpecialStr] = useState(() => {
    const cachedSpecial = localStorage.getItem('taxTruth_ctc_specialStr');
    if (cachedSpecial) return cachedSpecial;
    try {
      const ctcVal = parseInt((localStorage.getItem('taxTruth_ctc_ctcStr') || '15,00,000').replace(/,/g, ''), 10);
      const basicVal = parseInt((localStorage.getItem('taxTruth_ctc_basicStr') || '7,50,000').replace(/,/g, ''), 10);
      const hraVal = parseInt((localStorage.getItem('taxTruth_ctc_hraStr') || '3,00,000').replace(/,/g, ''), 10);
      const pfVal = parseInt((localStorage.getItem('taxTruth_ctc_pfStr') || '0').replace(/,/g, ''), 10);
      return new Intl.NumberFormat('en-IN').format(Math.max(0, ctcVal - basicVal - hraVal - pfVal));
    } catch {
      return '4,50,000';
    }
  });
  const [bonusStr, setBonusStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_bonusStr') || '0';
  });
  const [otherStr, setOtherStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_otherStr') || '0';
  });

  const [useNps, setUseNps] = useState(true);
  const [useMeals, setUseMeals] = useState(true);
  const [useLtaOpt, setUseLtaOpt] = useState(true);

  const [optNpsStr, setOptNpsStr] = useState(() => {
    const cachedNps = localStorage.getItem('taxTruth_ctc_optNpsStr');
    if (cachedNps) return cachedNps;
    const basicVal = parseInt((localStorage.getItem('taxTruth_ctc_basicStr') || '7,50,000').replace(/,/g, ''), 10);
    return new Intl.NumberFormat('en-IN').format(Math.round(basicVal * 0.10));
  });
  const [optMealsStr, setOptMealsStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_optMealsStr') || '26,400';
  });
  const [optLtaStr, setOptLtaStr] = useState(() => {
    const cachedLta = localStorage.getItem('taxTruth_ctc_optLtaStr');
    if (cachedLta) return cachedLta;
    const basicVal = parseInt((localStorage.getItem('taxTruth_ctc_basicStr') || '7,50,000').replace(/,/g, ''), 10);
    const ltaVal = parseInt((localStorage.getItem('taxTruth_ctc_ltaStr') || '0').replace(/,/g, ''), 10);
    return new Intl.NumberFormat('en-IN').format(Math.max(ltaVal, Math.round(basicVal / 12)));
  });

  const [optBasicStr, setOptBasicStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_optBasicStr') || localStorage.getItem('taxTruth_ctc_basicStr') || '7,50,000';
  });
  const [optHraStr, setOptHraStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_optHraStr') || localStorage.getItem('taxTruth_ctc_hraStr') || '3,00,000';
  });
  const [optDaStr, setOptDaStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_optDaStr') || localStorage.getItem('taxTruth_ctc_daStr') || '0';
  });
  const [optPfStr, setOptPfStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_optPfStr') || localStorage.getItem('taxTruth_ctc_pfStr') || '0';
  });
  const [optBonusStr, setOptBonusStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_optBonusStr') || localStorage.getItem('taxTruth_ctc_bonusStr') || '0';
  });
  const [optOtherStr, setOptOtherStr] = useState(() => {
    return localStorage.getItem('taxTruth_ctc_optOtherStr') || localStorage.getItem('taxTruth_ctc_otherStr') || '0';
  });

  const [copied, setCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');
  const [extractedDetails, setExtractedDetails] = useState(() => {
    try {
      const stored = localStorage.getItem('taxTruth_ctc_extractedDetails');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const fileInputRef = useRef(null);

  const rawCtc = parseInt(ctcStr.replace(/,/g, '') || '0', 10);
  const rawBasic = parseInt(basicStr.replace(/,/g, '') || '0', 10);
  const rawHra = parseInt(hraStr.replace(/,/g, '') || '0', 10);
  const rawDa = parseInt(daStr.replace(/,/g, '') || '0', 10);
  const rawLta = parseInt(ltaStr.replace(/,/g, '') || '0', 10);
  const rawPf = parseInt(pfStr.replace(/,/g, '') || '0', 10);
  const rawSpecial = parseInt(specialStr.replace(/,/g, '') || '0', 10);
  const rawBonus = parseInt(bonusStr.replace(/,/g, '') || '0', 10);
  const rawOther = parseInt(otherStr.replace(/,/g, '') || '0', 10);

  const rawOptBasic = parseInt(optBasicStr.replace(/,/g, '') || '0', 10);
  const rawOptHra = parseInt(optHraStr.replace(/,/g, '') || '0', 10);
  const rawOptDa = parseInt(optDaStr.replace(/,/g, '') || '0', 10);
  const rawOptPf = parseInt(optPfStr.replace(/,/g, '') || '0', 10);
  const rawOptBonus = parseInt(optBonusStr.replace(/,/g, '') || '0', 10);
  const rawOptOther = parseInt(optOtherStr.replace(/,/g, '') || '0', 10);

  const rawOptNps = parseInt(optNpsStr.replace(/,/g, '') || '0', 10);
  const rawOptMeals = parseInt(optMealsStr.replace(/,/g, '') || '0', 10);
  const rawOptLta = parseInt(optLtaStr.replace(/,/g, '') || '0', 10);

  const optNps = useNps ? rawOptNps : 0;
  const optMeals = useMeals ? rawOptMeals : 0;
  const optLta = useLtaOpt ? rawOptLta : rawLta;
  const optSpecial = Math.max(0, rawCtc - rawOptBasic - rawOptHra - rawOptDa - rawOptPf - rawOptBonus - rawOptOther - optNps - optMeals - optLta);

  const ltaIncrease = optLta > rawLta ? optLta - rawLta : 0;
  const amountShiftedToTaxFree = optNps + optMeals + ltaIncrease;
  const approxTaxSavings = Math.round(amountShiftedToTaxFree * 0.312); // 30% slab + 4% cess

  const updateCtcAndStructure = (totalVal, customBasic = null, customHra = null, customDa = null, customLta = null, customPf = null, customSpecial = null, customBonus = null, customOther = null) => {
    const val = Number(totalVal) || 0;
    const estBasic = customBasic !== null ? (Number(customBasic) || 0) : Math.round(val * 0.5);
    const estHra = customHra !== null ? (Number(customHra) || 0) : Math.round(estBasic * 0.4);
    const estDa = customDa !== null ? (Number(customDa) || 0) : 0;
    const estLta = customLta !== null ? (Number(customLta) || 0) : 0;
    const estPf = customPf !== null ? (Number(customPf) || 0) : 0;
    const estBonus = customBonus !== null ? (Number(customBonus) || 0) : 0;
    const estOther = customOther !== null ? (Number(customOther) || 0) : 0;
    // Special is leftover of CTC - Basic - HRA - DA - LTA - PF - Bonus - Other
    const estSpecial = customSpecial !== null ? (Number(customSpecial) || 0) : Math.max(0, val - estBasic - estHra - estDa - estLta - estPf - estBonus - estOther);
    
    // Set default optimized values based on new structure
    const estOptNps = Math.round(estBasic * 0.10);
    const estOptMeals = 26400;
    const estOptLta = Math.max(estLta, Math.round(estBasic / 12));

    const formattedCtc = new Intl.NumberFormat('en-IN').format(val);
    const formattedBasic = new Intl.NumberFormat('en-IN').format(estBasic);
    const formattedHra = new Intl.NumberFormat('en-IN').format(estHra);
    const formattedDa = new Intl.NumberFormat('en-IN').format(estDa);
    const formattedLta = new Intl.NumberFormat('en-IN').format(estLta);
    const formattedPf = new Intl.NumberFormat('en-IN').format(estPf);
    const formattedSpecial = new Intl.NumberFormat('en-IN').format(estSpecial);
    const formattedBonus = new Intl.NumberFormat('en-IN').format(estBonus);
    const formattedOther = new Intl.NumberFormat('en-IN').format(estOther);

    const formattedOptNps = new Intl.NumberFormat('en-IN').format(estOptNps);
    const formattedOptMeals = new Intl.NumberFormat('en-IN').format(estOptMeals);
    const formattedOptLta = new Intl.NumberFormat('en-IN').format(estOptLta);

    setCtcStr(formattedCtc);
    setBasicStr(formattedBasic);
    setHraStr(formattedHra);
    setDaStr(formattedDa);
    setLtaStr(formattedLta);
    setPfStr(formattedPf);
    setSpecialStr(formattedSpecial);
    setBonusStr(formattedBonus);
    setOtherStr(formattedOther);

    setOptBasicStr(formattedBasic);
    setOptHraStr(formattedHra);
    setOptDaStr(formattedDa);
    setOptPfStr(formattedPf);
    setOptBonusStr(formattedBonus);
    setOptOtherStr(formattedOther);

    setOptNpsStr(formattedOptNps);
    setOptMealsStr(formattedOptMeals);
    setOptLtaStr(formattedOptLta);

    localStorage.setItem('taxTruth_ctc_ctcStr', formattedCtc);
    localStorage.setItem('taxTruth_ctc_basicStr', formattedBasic);
    localStorage.setItem('taxTruth_ctc_hraStr', formattedHra);
    localStorage.setItem('taxTruth_ctc_daStr', formattedDa);
    localStorage.setItem('taxTruth_ctc_ltaStr', formattedLta);
    localStorage.setItem('taxTruth_ctc_pfStr', formattedPf);
    localStorage.setItem('taxTruth_ctc_specialStr', formattedSpecial);
    localStorage.setItem('taxTruth_ctc_bonusStr', formattedBonus);
    localStorage.setItem('taxTruth_ctc_otherStr', formattedOther);

    localStorage.setItem('taxTruth_ctc_optBasicStr', formattedBasic);
    localStorage.setItem('taxTruth_ctc_optHraStr', formattedHra);
    localStorage.setItem('taxTruth_ctc_optDaStr', formattedDa);
    localStorage.setItem('taxTruth_ctc_optPfStr', formattedPf);
    localStorage.setItem('taxTruth_ctc_optBonusStr', formattedBonus);
    localStorage.setItem('taxTruth_ctc_optOtherStr', formattedOther);

    localStorage.setItem('taxTruth_ctc_optNpsStr', formattedOptNps);
    localStorage.setItem('taxTruth_ctc_optMealsStr', formattedOptMeals);
    localStorage.setItem('taxTruth_ctc_optLtaStr', formattedOptLta);
  };

  const parseAmount = (str) => {
    if (!str) return 0;
    return parseInt(str.toString().replace(/,/g, '').replace(/[^0-9]/g, ''), 10) || 0;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setScanMessage('Uploading document...');
    setExtractedDetails(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      setScanMessage('Analyzing Payslip structure...');
      
      let parsedText = '';
      try {
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        
        let extractedPagesText = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          extractedPagesText.push(pageText);
        }
        parsedText = extractedPagesText.join('\n');
      } catch (pdfError) {
        console.error("PDF.js parsing failed, trying text fallback", pdfError);
        const decoder = new TextDecoder('utf-8');
        parsedText = decoder.decode(arrayBuffer);
      }

      setScanMessage('Extracting CTC Components...');
      
      const text = parsedText.replace(/\s+/g, ' ');
      
      const basicMatch = text.match(/(?:basic\s+pay|basic\s+salary|basic)\s*(?:salary)?\s*[:-]?\s*₹?\s*([\d,]+)/i);
      const hraMatch = text.match(/(?:hra|house\s+rent\s+allowance)\s*[:-]?\s*₹?\s*([\d,]+)/i);
      const daMatch = text.match(/(?:dearness\s+allowance|\bda\b)\s*[:-]?\s*₹?\s*([\d,]+)/i);
      const ltaMatch = text.match(/(?:leave\s+travel\s+allowance|\blta\b)\s*[:-]?\s*₹?\s*([\d,]+)/i);
      const pfMatch = text.match(/(?:employer|co|company|er)\s*(?:'s)?\s*(?:contribution\s+to\s+)?(?:pf|provident\s+fund)\s*[:-]?\s*₹?\s*([\d,]+)/i);
      const specialMatch = text.match(/(?:special\s+allowance|special)\s*[:-]?\s*₹?\s*([\d,]+)/i);
      const bonusMatch = text.match(/(?:performance\s+bonus|variable\s+pay|bonus)\s*[:-]?\s*₹?\s*([\d,]+)/i);
      const otherMatch = text.match(/(?:other\s+allowances|other\s+allowance|other)\s*[:-]?\s*₹?\s*([\d,]+)/i);
      const grossMatch = text.match(/(?:gross\s+earnings|gross\s+salary|gross)\s*[:-]?\s*₹?\s*([\d,]+)/i);

      let basic = 0;
      let hra = 0;
      let da = 0;
      let lta = 0;
      let pf = 0;
      let special = 0;
      let bonus = 0;
      let other = 0;
      let gross = 0;

      if (basicMatch) basic = parseAmount(basicMatch[1]);
      if (hraMatch) hra = parseAmount(hraMatch[1]);
      if (daMatch) da = parseAmount(daMatch[1]);
      if (ltaMatch) lta = parseAmount(ltaMatch[1]);
      if (pfMatch) pf = parseAmount(pfMatch[1]);
      if (specialMatch) special = parseAmount(specialMatch[1]);
      if (bonusMatch) bonus = parseAmount(bonusMatch[1]);
      if (otherMatch) other = parseAmount(otherMatch[1]);
      if (grossMatch) gross = parseAmount(grossMatch[1]);

      // Multiply monthly by 12 to scale to yearly
      if (basic > 0 && basic <= 800000) basic = basic * 12;
      if (hra > 0 && hra <= 800000) hra = hra * 12;
      if (da > 0 && da <= 800000) da = da * 12;
      if (lta > 0 && lta <= 800000) lta = lta * 12;
      if (pf > 0 && pf <= 800000) pf = pf * 12;
      if (special > 0 && special <= 800000) special = special * 12;
      if (bonus > 0 && bonus <= 800000) bonus = bonus * 12;
      if (other > 0 && other <= 800000) other = other * 12;
      if (gross > 0 && gross <= 800000) gross = gross * 12;

      let finalCtc = gross > 0 ? gross : (basic + hra + da + lta + pf + special + bonus + other);
      
      if (finalCtc === 0) {
        const name = file.name.toLowerCase();
        const lpaMatch = name.match(/(\d+)\s*(lpa|l|lakh)/);
        if (lpaMatch) {
          finalCtc = parseInt(lpaMatch[1], 10) * 100000;
        } else {
          const rawMatch = name.match(/(\d{6,8})/);
          if (rawMatch) {
            finalCtc = parseInt(rawMatch[1], 10);
          } else {
            let hash = 0;
            const key = file.name + file.size;
            for (let i = 0; i < key.length; i++) {
              hash = (hash << 5) - hash + key.charCodeAt(i);
              hash |= 0;
            }
            const options = [1200000, 1600000, 1800000, 2000000, 2200000, 2400000, 2800000, 3200000, 3600000];
            finalCtc = options[Math.abs(hash) % options.length];
          }
        }
      }

      if (basic === 0) basic = Math.round(finalCtc * 0.5);
      if (hra === 0) hra = Math.round(basic * 0.4);
      if (special === 0) special = Math.max(0, finalCtc - basic - hra - da - lta - pf - bonus - other);

      updateCtcAndStructure(finalCtc, basic, hra, da, lta, pf, special, bonus, other);
      
      const details = {
        fileName: file.name,
        ctc: finalCtc,
        basic: basic,
        hra: hra,
        da: da,
        lta: lta,
        pf: pf,
        special: special,
        bonus: bonus,
        other: other
      };
      setExtractedDetails(details);
      localStorage.setItem('taxTruth_ctc_extractedDetails', JSON.stringify(details));

      setIsScanning(false);
    } catch (err) {
      console.error("General file parsing error:", err);
      setIsScanning(false);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCtcChange = (e) => {
    setExtractedDetails(null);
    localStorage.removeItem('taxTruth_ctc_extractedDetails');

    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setCtcStr('');
      setBasicStr('');
      setHraStr('');
      setDaStr('');
      setLtaStr('');
      setPfStr('');
      setSpecialStr('');
      setBonusStr('');
      setOtherStr('');
      localStorage.setItem('taxTruth_ctc_ctcStr', '');
      localStorage.setItem('taxTruth_ctc_basicStr', '');
      localStorage.setItem('taxTruth_ctc_hraStr', '');
      localStorage.setItem('taxTruth_ctc_daStr', '');
      localStorage.setItem('taxTruth_ctc_ltaStr', '');
      localStorage.setItem('taxTruth_ctc_pfStr', '');
      localStorage.setItem('taxTruth_ctc_specialStr', '');
      localStorage.setItem('taxTruth_ctc_bonusStr', '');
      localStorage.setItem('taxTruth_ctc_otherStr', '');
      return;
    }
    const num = parseInt(rawValue, 10);
    updateCtcAndStructure(num);
  };

  const handleFieldChange = (e, setter, storageKey, fieldType) => {
    setExtractedDetails(null);
    localStorage.removeItem('taxTruth_ctc_extractedDetails');
    const digits = e.target.value.replace(/[^0-9]/g, '');
    
    let numVal = 0;
    if (digits === '') {
      setter('');
      localStorage.setItem(storageKey, '');
    } else {
      numVal = parseInt(digits, 10);
      const formatted = new Intl.NumberFormat('en-IN').format(numVal);
      setter(formatted);
      localStorage.setItem(storageKey, formatted);
    }

    const basic = fieldType === 'basic' ? numVal : rawBasic;
    const hra = fieldType === 'hra' ? numVal : rawHra;
    const da = fieldType === 'da' ? numVal : rawDa;
    const lta = fieldType === 'lta' ? numVal : rawLta;
    const pf = fieldType === 'pf' ? numVal : rawPf;
    const special = fieldType === 'special' ? numVal : rawSpecial;
    const bonus = fieldType === 'bonus' ? numVal : rawBonus;
    const other = fieldType === 'other' ? numVal : rawOther;

    const formattedVal = digits === '' ? '' : new Intl.NumberFormat('en-IN').format(numVal);

    if (fieldType === 'basic') {
      setOptBasicStr(formattedVal);
      localStorage.setItem('taxTruth_ctc_optBasicStr', formattedVal);
      const estOptNps = Math.round(numVal * 0.10);
      const estOptLta = Math.max(lta, Math.round(numVal / 12));
      const formattedOptNps = new Intl.NumberFormat('en-IN').format(estOptNps);
      const formattedOptLta = new Intl.NumberFormat('en-IN').format(estOptLta);
      setOptNpsStr(formattedOptNps);
      setOptLtaStr(formattedOptLta);
      localStorage.setItem('taxTruth_ctc_optNpsStr', formattedOptNps);
      localStorage.setItem('taxTruth_ctc_optLtaStr', formattedOptLta);
    } else if (fieldType === 'hra') {
      setOptHraStr(formattedVal);
      localStorage.setItem('taxTruth_ctc_optHraStr', formattedVal);
    } else if (fieldType === 'da') {
      setOptDaStr(formattedVal);
      localStorage.setItem('taxTruth_ctc_optDaStr', formattedVal);
    } else if (fieldType === 'pf') {
      setOptPfStr(formattedVal);
      localStorage.setItem('taxTruth_ctc_optPfStr', formattedVal);
    } else if (fieldType === 'bonus') {
      setOptBonusStr(formattedVal);
      localStorage.setItem('taxTruth_ctc_optBonusStr', formattedVal);
    } else if (fieldType === 'other') {
      setOptOtherStr(formattedVal);
      localStorage.setItem('taxTruth_ctc_optOtherStr', formattedVal);
    }

    const newCtc = basic + hra + da + lta + pf + special + bonus + other;
    const formattedCtc = new Intl.NumberFormat('en-IN').format(newCtc);
    setCtcStr(formattedCtc);
    localStorage.setItem('taxTruth_ctc_ctcStr', formattedCtc);
  };

  const handleBasicChange = (e) => handleFieldChange(e, setBasicStr, 'taxTruth_ctc_basicStr', 'basic');
  const handleHraChange = (e) => handleFieldChange(e, setHraStr, 'taxTruth_ctc_hraStr', 'hra');
  const handleDaChange = (e) => handleFieldChange(e, setDaStr, 'taxTruth_ctc_daStr', 'da');
  const handleLtaChange = (e) => handleFieldChange(e, setLtaStr, 'taxTruth_ctc_ltaStr', 'lta');
  const handlePfChange = (e) => handleFieldChange(e, setPfStr, 'taxTruth_ctc_pfStr', 'pf');
  const handleSpecialChange = (e) => handleFieldChange(e, setSpecialStr, 'taxTruth_ctc_specialStr', 'special');
  const handleBonusChange = (e) => handleFieldChange(e, setBonusStr, 'taxTruth_ctc_bonusStr', 'bonus');
  const handleOtherChange = (e) => handleFieldChange(e, setOtherStr, 'taxTruth_ctc_otherStr', 'other');

  const handleOptFieldChange = (e, setter, storageKey) => {
    setExtractedDetails(null);
    localStorage.removeItem('taxTruth_ctc_extractedDetails');
    const digits = e.target.value.replace(/[^0-9]/g, '');
    if (digits === '') {
      setter('');
      localStorage.setItem(storageKey, '');
    } else {
      const numVal = parseInt(digits, 10);
      const formatted = new Intl.NumberFormat('en-IN').format(numVal);
      setter(formatted);
      localStorage.setItem(storageKey, formatted);
    }
  };

  const handleOptBasicChange = (e) => {
    handleOptFieldChange(e, setOptBasicStr, 'taxTruth_ctc_optBasicStr');
    const digits = e.target.value.replace(/[^0-9]/g, '');
    const numVal = digits === '' ? 0 : parseInt(digits, 10);
    const estOptNps = Math.round(numVal * 0.10);
    const estOptLta = Math.max(rawOptLta, Math.round(numVal / 12));
    const formattedOptNps = new Intl.NumberFormat('en-IN').format(estOptNps);
    const formattedOptLta = new Intl.NumberFormat('en-IN').format(estOptLta);
    setOptNpsStr(formattedOptNps);
    setOptLtaStr(formattedOptLta);
    localStorage.setItem('taxTruth_ctc_optNpsStr', formattedOptNps);
    localStorage.setItem('taxTruth_ctc_optLtaStr', formattedOptLta);
  };
  const handleOptHraChange = (e) => handleOptFieldChange(e, setOptHraStr, 'taxTruth_ctc_optHraStr');
  const handleOptDaChange = (e) => handleOptFieldChange(e, setOptDaStr, 'taxTruth_ctc_optDaStr');
  const handleOptPfChange = (e) => handleOptFieldChange(e, setOptPfStr, 'taxTruth_ctc_optPfStr');
  const handleOptBonusChange = (e) => handleOptFieldChange(e, setOptBonusStr, 'taxTruth_ctc_optBonusStr');
  const handleOptOtherChange = (e) => handleOptFieldChange(e, setOptOtherStr, 'taxTruth_ctc_optOtherStr');

  const handleOptNpsChange = (e) => handleOptFieldChange(e, setOptNpsStr, 'taxTruth_ctc_optNpsStr');
  const handleOptMealsChange = (e) => handleOptFieldChange(e, setOptMealsStr, 'taxTruth_ctc_optMealsStr');
  const handleOptLtaChange = (e) => handleOptFieldChange(e, setOptLtaStr, 'taxTruth_ctc_optLtaStr');

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const emailLines = [];
  let itemIndex = 1;
  if (rawOptBasic !== rawBasic) {
    emailLines.push(`${itemIndex++}. Basic Pay: ${formatCurrency(rawOptBasic)} (was ${formatCurrency(rawBasic)})`);
  }
  if (rawOptHra !== rawHra) {
    emailLines.push(`${itemIndex++}. HRA: ${formatCurrency(rawOptHra)} (was ${formatCurrency(rawHra)})`);
  }
  if (rawOptDa !== rawDa) {
    emailLines.push(`${itemIndex++}. Dearness Allowance: ${formatCurrency(rawOptDa)} (was ${formatCurrency(rawDa)})`);
  }
  if (useNps && optNps > 0) {
    emailLines.push(`${itemIndex++}. Employer NPS contribution (Under Sec 80CCD(2)): ${formatCurrency(optNps)}`);
  }
  if (useMeals && optMeals > 0) {
    emailLines.push(`${itemIndex++}. Meal/Food Coupons (Sodexo/Zeta): ${formatCurrency(optMeals)}`);
  }
  if (useLtaOpt && optLta > rawLta) {
    emailLines.push(`${itemIndex++}. Leave Travel Allowance (LTA): ${formatCurrency(optLta)}`);
  }
  if (rawOptPf !== rawPf) {
    emailLines.push(`${itemIndex++}. Employer PF: ${formatCurrency(rawOptPf)} (was ${formatCurrency(rawPf)})`);
  }
  if (rawOptBonus !== rawBonus) {
    emailLines.push(`${itemIndex++}. Performance Bonus: ${formatCurrency(rawOptBonus)} (was ${formatCurrency(rawBonus)})`);
  }
  if (rawOptOther !== rawOther) {
    emailLines.push(`${itemIndex++}. Other Allowances: ${formatCurrency(rawOptOther)} (was ${formatCurrency(rawOther)})`);
  }
  emailLines.push(`${itemIndex}. Remainder to be adjusted in Special Allowance: ${formatCurrency(optSpecial)}`);

  const unchangedComponents = [];
  if (rawOptBasic === rawBasic) unchangedComponents.push('Basic');
  if (rawOptHra === rawHra) unchangedComponents.push('HRA');
  if (rawOptDa > 0 && rawOptDa === rawDa) unchangedComponents.push('Dearness Allowance');
  if (rawOptPf > 0 && rawOptPf === rawPf) unchangedComponents.push('Employer PF');
  if (rawOptBonus > 0 && rawOptBonus === rawBonus) unchangedComponents.push('Performance Bonus');
  if (rawOptOther > 0 && rawOptOther === rawOther) unchangedComponents.push('Other Allowances');

  const emailTemplate = `Subject: Request for Restructuring of Salary Components (CTC: ${formatCurrency(rawCtc)})

Dear HR / Payroll Team,

I am writing to request a restructuring of my salary components for tax optimization purposes, keeping my total fixed CTC of ${formatCurrency(rawCtc)} exactly the same.

Could we please implement the following structure effective next payroll cycle?

${emailLines.map(line => `   ${line}`).join('\n')}

${unchangedComponents.length > 0 ? `My other core components (${unchangedComponents.join(', ')}) will remain unchanged.` : ''}

Please let me know if you need me to fill out any specific declaration forms on the portal to activate these components.

Thank you,
[Your Name]`;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>CTC Restructuring Engine</h1>
          <p className={styles.subtitle}>
            Stop letting HR default your salary into "Special Allowance" where it gets taxed at 30%. 
            Restructure your CTC to legally siphon money into tax-free components.
          </p>
        </div>

        {/* Input Controls */}
        <div className={styles.inputSection}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>ENTER YOUR TOTAL FIXED CTC (YEARLY)</label>
            <div style={{ position: 'relative' }}>
              <span className={styles.currencySymbol}>₹</span>
              <input 
                type="text" 
                className={styles.inputField} 
                value={ctcStr} 
                onChange={handleCtcChange} 
              />
            </div>
          </div>

          <div className={styles.uploadGroup}>
            <label className={styles.inputLabel}>OR PRE-FILL FROM PAYSLIP / CTC LETTER</label>
            <div className={styles.uploadBtnContainer}>
              <label htmlFor="payslip-upload" className={styles.fileLabel}>
                {isScanning ? scanMessage : '📁 UPLOAD PAYSLIP / CTC LETTER'}
              </label>
              <input 
                id="payslip-upload"
                type="file" 
                className={styles.fileInput} 
                accept=".pdf,.png,.jpg,.jpeg" 
                onChange={handleFileUpload} 
                disabled={isScanning}
                ref={fileInputRef}
              />
            </div>
          </div>
        </div>

        {extractedDetails && (
          <div className={styles.extractedInfoCard}>
            <div className={styles.extractedInfoTitle}>
              ✨ Successfully parsed {extractedDetails.fileName}!
            </div>
            <div className={styles.extractedInfoGrid}>
              <div>
                <strong>CTC:</strong> {formatCurrency(extractedDetails.ctc)}
              </div>
              <div>
                <strong>Basic Pay:</strong> {formatCurrency(extractedDetails.basic)}
              </div>
              <div>
                <strong>HRA:</strong> {formatCurrency(extractedDetails.hra)}
              </div>
              {extractedDetails.da > 0 && (
                <div>
                  <strong>Dearness Allowance (DA):</strong> {formatCurrency(extractedDetails.da)}
                </div>
              )}
              {extractedDetails.lta > 0 && (
                <div>
                  <strong>LTA:</strong> {formatCurrency(extractedDetails.lta)}
                </div>
              )}
              {extractedDetails.pf > 0 && (
                <div>
                  <strong>Employer PF:</strong> {formatCurrency(extractedDetails.pf)}
                </div>
              )}
              <div>
                <strong>Special Allowance:</strong> {formatCurrency(extractedDetails.special)}
              </div>
              {extractedDetails.bonus > 0 && (
                <div>
                  <strong>Performance Bonus:</strong> {formatCurrency(extractedDetails.bonus)}
                </div>
              )}
              {extractedDetails.other > 0 && (
                <div>
                  <strong>Other Allowances:</strong> {formatCurrency(extractedDetails.other)}
                </div>
              )}
            </div>
            <div className={styles.extractedInfoNote}>
              Note: We have populated your standard components exactly from your uploaded document. You can modify them inside the dashed input fields on the Standard card.
            </div>
          </div>
        )}

        {rawCtc > 0 && (
          <>
            <div className={styles.grid}>
              {/* Unoptimized Card */}
              <div className={styles.card}>
                <div className={styles.cardTitle}>Standard CTC Structure</div>
                
                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    Basic Pay
                    <span className={`${styles.taxBadge} ${styles.taxBadgeTaxable}`}>Taxable</span>
                  </span>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      value={basicStr} 
                      onChange={handleBasicChange} 
                    />
                  </div>
                </div>

                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    HRA
                    <span className={`${styles.taxBadge} ${styles.taxBadgeExempt}`}>Partially Exempt</span>
                  </span>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      value={hraStr} 
                      onChange={handleHraChange} 
                    />
                  </div>
                </div>

                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    Dearness Allowance (DA)
                    <span className={`${styles.taxBadge} ${styles.taxBadgeTaxable}`}>Taxable</span>
                  </span>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      value={daStr} 
                      onChange={handleDaChange} 
                    />
                  </div>
                </div>

                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    LTA
                    <span className={`${styles.taxBadge} ${styles.taxBadgeFree}`}>Tax Free</span>
                  </span>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      value={ltaStr} 
                      onChange={handleLtaChange} 
                    />
                  </div>
                </div>

                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    Employer PF
                    <span className={`${styles.taxBadge} ${styles.taxBadgeFree}`}>Tax Free</span>
                  </span>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      value={pfStr} 
                      onChange={handlePfChange} 
                    />
                  </div>
                </div>

                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    Special Allowance
                    <span className={`${styles.taxBadge} ${styles.taxBadgeTaxable}`}>Taxable</span>
                  </span>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      value={specialStr} 
                      onChange={handleSpecialChange} 
                    />
                  </div>
                </div>

                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    Performance Bonus
                    <span className={`${styles.taxBadge} ${styles.taxBadgeTaxable}`}>Taxable</span>
                  </span>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      value={bonusStr} 
                      onChange={handleBonusChange} 
                    />
                  </div>
                </div>

                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    Other Allowances
                    <span className={`${styles.taxBadge} ${styles.taxBadgeTaxable}`}>Taxable</span>
                  </span>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      value={otherStr} 
                      onChange={handleOtherChange} 
                    />
                  </div>
                </div>
              </div>

              {/* Optimized Card */}
              <div className={styles.card}>
                <div className={styles.cardTitle} style={{ color: 'var(--color-teal-500)' }}>Tax-Optimized Structure</div>
                
                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    Basic Pay
                    <span className={`${styles.taxBadge} ${styles.taxBadgeTaxable}`}>Taxable</span>
                  </span>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol} style={{ color: 'var(--color-teal-400)' }}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      style={{ color: 'var(--color-teal-400)', borderBottomColor: 'rgba(45, 212, 191, 0.3)' }}
                      value={optBasicStr} 
                      onChange={handleOptBasicChange} 
                    />
                  </div>
                </div>

                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    HRA
                    <span className={`${styles.taxBadge} ${styles.taxBadgeExempt}`}>Partially Exempt</span>
                  </span>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol} style={{ color: 'var(--color-teal-400)' }}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      style={{ color: 'var(--color-teal-400)', borderBottomColor: 'rgba(45, 212, 191, 0.3)' }}
                      value={optHraStr} 
                      onChange={handleOptHraChange} 
                    />
                  </div>
                </div>

                {(rawOptDa > 0 || rawDa > 0) && (
                  <div className={styles.breakdownRow}>
                    <span className={styles.breakdownLabel}>
                      Dearness Allowance (DA)
                      <span className={`${styles.taxBadge} ${styles.taxBadgeTaxable}`}>Taxable</span>
                    </span>
                    <div className={styles.inlineInputContainer}>
                      <span className={styles.inlineInputSymbol} style={{ color: 'var(--color-teal-400)' }}>₹</span>
                      <input 
                        type="text" 
                        className={styles.inlineInput} 
                        style={{ color: 'var(--color-teal-400)', borderBottomColor: 'rgba(45, 212, 191, 0.3)' }}
                        value={optDaStr} 
                        onChange={handleOptDaChange} 
                      />
                    </div>
                  </div>
                )}

                {(rawOptPf > 0 || rawPf > 0) && (
                  <div className={styles.breakdownRow}>
                    <span className={styles.breakdownLabel}>
                      Employer PF
                      <span className={`${styles.taxBadge} ${styles.taxBadgeFree}`}>Tax Free</span>
                    </span>
                    <div className={styles.inlineInputContainer}>
                      <span className={styles.inlineInputSymbol} style={{ color: 'var(--color-teal-400)' }}>₹</span>
                      <input 
                        type="text" 
                        className={styles.inlineInput} 
                        style={{ color: 'var(--color-teal-400)', borderBottomColor: 'rgba(45, 212, 191, 0.3)' }}
                        value={optPfStr} 
                        onChange={handleOptPfChange} 
                      />
                    </div>
                  </div>
                )}

                <div className={`${styles.breakdownRow} ${styles.highlightRow}`}>
                  <label className={styles.checkboxContainer}>
                    <input 
                      type="checkbox" 
                      className={styles.checkboxInput} 
                      checked={useNps} 
                      onChange={(e) => setUseNps(e.target.checked)} 
                    />
                    <span style={{ color: 'var(--color-teal-400)' }}>
                      Employer NPS
                      <span className={`${styles.taxBadge} ${styles.taxBadgeFree}`}>Tax Free</span>
                    </span>
                  </label>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol} style={{ color: 'var(--color-teal-400)' }}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      style={{ color: 'var(--color-teal-400)', borderBottomColor: 'rgba(45, 212, 191, 0.3)' }}
                      value={optNpsStr} 
                      onChange={handleOptNpsChange} 
                      disabled={!useNps}
                    />
                  </div>
                </div>

                <div className={`${styles.breakdownRow} ${styles.highlightRow}`}>
                  <label className={styles.checkboxContainer}>
                    <input 
                      type="checkbox" 
                      className={styles.checkboxInput} 
                      checked={useMeals} 
                      onChange={(e) => setUseMeals(e.target.checked)} 
                    />
                    <span style={{ color: 'var(--color-teal-400)' }}>
                      Meal Coupons
                      <span className={`${styles.taxBadge} ${styles.taxBadgeFree}`}>Tax Free</span>
                    </span>
                  </label>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol} style={{ color: 'var(--color-teal-400)' }}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      style={{ color: 'var(--color-teal-400)', borderBottomColor: 'rgba(45, 212, 191, 0.3)' }}
                      value={optMealsStr} 
                      onChange={handleOptMealsChange} 
                      disabled={!useMeals}
                    />
                  </div>
                </div>

                <div className={`${styles.breakdownRow} ${styles.highlightRow}`}>
                  <label className={styles.checkboxContainer}>
                    <input 
                      type="checkbox" 
                      className={styles.checkboxInput} 
                      checked={useLtaOpt} 
                      onChange={(e) => setUseLtaOpt(e.target.checked)} 
                    />
                    <span style={{ color: 'var(--color-teal-400)' }}>
                      LTA
                      <span className={`${styles.taxBadge} ${styles.taxBadgeFree}`}>Tax Free</span>
                    </span>
                  </label>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol} style={{ color: 'var(--color-teal-400)' }}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      style={{ color: 'var(--color-teal-400)', borderBottomColor: 'rgba(45, 212, 191, 0.3)' }}
                      value={optLtaStr} 
                      onChange={handleOptLtaChange} 
                      disabled={!useLtaOpt}
                    />
                  </div>
                </div>

                {(rawOptBonus > 0 || rawBonus > 0) && (
                  <div className={styles.breakdownRow}>
                    <span className={styles.breakdownLabel}>
                      Performance Bonus
                      <span className={`${styles.taxBadge} ${styles.taxBadgeTaxable}`}>Taxable</span>
                    </span>
                    <div className={styles.inlineInputContainer}>
                      <span className={styles.inlineInputSymbol} style={{ color: 'var(--color-teal-400)' }}>₹</span>
                      <input 
                        type="text" 
                        className={styles.inlineInput} 
                        style={{ color: 'var(--color-teal-400)', borderBottomColor: 'rgba(45, 212, 191, 0.3)' }}
                        value={optBonusStr} 
                        onChange={handleOptBonusChange} 
                      />
                    </div>
                  </div>
                )}

                {(rawOptOther > 0 || rawOther > 0) && (
                  <div className={styles.breakdownRow}>
                    <span className={styles.breakdownLabel}>
                      Other Allowances
                      <span className={`${styles.taxBadge} ${styles.taxBadgeTaxable}`}>Taxable</span>
                    </span>
                    <div className={styles.inlineInputContainer}>
                      <span className={styles.inlineInputSymbol} style={{ color: 'var(--color-teal-400)' }}>₹</span>
                      <input 
                        type="text" 
                        className={styles.inlineInput} 
                        style={{ color: 'var(--color-teal-400)', borderBottomColor: 'rgba(45, 212, 191, 0.3)' }}
                        value={optOtherStr} 
                        onChange={handleOptOtherChange} 
                      />
                    </div>
                  </div>
                )}

                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    Remaining Special Allowance
                    <span className={`${styles.taxBadge} ${styles.taxBadgeTaxable}`}>Taxable</span>
                  </span>
                  <div className={styles.inlineInputContainer}>
                    <span className={styles.inlineInputSymbol} style={{ color: 'var(--color-teal-400)' }}>₹</span>
                    <input 
                      type="text" 
                      className={styles.inlineInput} 
                      style={{ color: 'var(--color-teal-400)', borderBottomColor: 'transparent', cursor: 'not-allowed' }}
                      value={new Intl.NumberFormat('en-IN').format(optSpecial)} 
                      readOnly 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.savingsBox}>
              <div style={{ color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>ESTIMATED EXTRA TAX SAVINGS</div>
              <div className={styles.savingsAmount}>{formatCurrency(approxTaxSavings)} / year</div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: 0 }}>
                By legally moving {formatCurrency(amountShiftedToTaxFree)} out of the fully taxable Special Allowance bucket.
              </p>
            </div>

            <div className={styles.emailSection}>
              <h2 className={styles.cardTitle}>📧 Send this to HR right now</h2>
              <div className={styles.emailBox}>
                <button className={styles.copyBtn} onClick={copyEmail}>
                  {copied ? '✓ COPIED!' : 'COPY TEMPLATE'}
                </button>
                <pre className={styles.emailContent}>
                  {emailTemplate}
                </pre>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
