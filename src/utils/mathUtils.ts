import { ArmstrongResult, DigitStep, DigitSumResult, SimulationStep } from '../types';

export function calculateDigitSum(inputNum: number): DigitSumResult {
  const isNegative = inputNum < 0;
  const num = Math.abs(inputNum);
  
  if (num === 0) {
    return {
      originalNumber: inputNum,
      isNegative,
      digits: [0],
      digitCount: 1,
      sum: 0,
      formula: '0 = 0',
      steps: [
        {
          stepIndex: 1,
          remainingNumberBefore: 0,
          digit: 0,
          runningTotalBefore: 0,
          runningTotalAfter: 0,
          remainingNumberAfter: 0,
          explanation: 'Sayı 0 olduğundan basamak toplamı 0\'dır.'
        }
      ]
    };
  }

  // Extract digits from left to right for visual display, but algorithm works right-to-left
  const digitsStr = num.toString();
  const digits = digitsStr.split('').map(d => parseInt(d, 10));
  const digitCount = digits.length;
  
  // Algorithmic steps matching the Java while(tempNumber != 0) loop
  const steps: DigitStep[] = [];
  let tempNumber = num;
  let runningTotal = 0;
  let stepIndex = 1;

  while (tempNumber !== 0) {
    const basValue = tempNumber % 10;
    const runningBefore = runningTotal;
    runningTotal += basValue;
    const nextTemp = Math.floor(tempNumber / 10);

    steps.push({
      stepIndex,
      remainingNumberBefore: tempNumber,
      digit: basValue,
      runningTotalBefore: runningBefore,
      runningTotalAfter: runningTotal,
      remainingNumberAfter: nextTemp,
      explanation: `${tempNumber} % 10 = ${basValue} elde edildi. Toplam: ${runningBefore} + ${basValue} = ${runningTotal}. Kalan sayı: ${tempNumber} / 10 = ${nextTemp}.`
    });

    tempNumber = nextTemp;
    stepIndex++;
  }

  const formula = `${digits.join(' + ')} = ${runningTotal}`;

  return {
    originalNumber: inputNum,
    isNegative,
    digits,
    digitCount,
    sum: runningTotal,
    formula,
    steps
  };
}

export function checkArmstrong(inputNum: number): ArmstrongResult {
  const num = Math.abs(inputNum);
  const digitsStr = num.toString();
  const digits = digitsStr.split('').map(d => parseInt(d, 10));
  const digitCount = digits.length;

  const powerResults = digits.map(d => ({
    digit: d,
    power: digitCount,
    result: Math.pow(d, digitCount)
  }));

  const totalSum = powerResults.reduce((acc, curr) => acc + curr.result, 0);
  const isArmstrong = totalSum === num && inputNum >= 0;

  // Step-by-step matching the Java code
  const steps: DigitStep[] = [];
  let temp = num;
  let runningTotal = 0;
  let stepIndex = 1;

  while (temp !== 0) {
    const basValue = temp % 10;
    const basPow = Math.pow(basValue, digitCount);
    const runningBefore = runningTotal;
    runningTotal += basPow;
    const nextTemp = Math.floor(temp / 10);

    steps.push({
      stepIndex,
      remainingNumberBefore: temp,
      digit: basValue,
      power: digitCount,
      powerResult: basPow,
      runningTotalBefore: runningBefore,
      runningTotalAfter: runningTotal,
      remainingNumberAfter: nextTemp,
      explanation: `${basValue}^${digitCount} = ${basPow}. Toplama eklendi (${runningBefore} + ${basPow} = ${runningTotal}). Sayı güncellendi: ${nextTemp}.`
    });

    temp = nextTemp;
    stepIndex++;
  }

  const formulaParts = powerResults.map(p => `(${p.digit}^${p.power})`);
  const valuesParts = powerResults.map(p => p.result);
  const formula = `${formulaParts.join(' + ')} = ${valuesParts.join(' + ')} = ${totalSum}`;

  return {
    originalNumber: inputNum,
    digits,
    digitCount,
    powerResults,
    totalSum,
    isArmstrong,
    formula,
    steps,
    difference: Math.abs(totalSum - num)
  };
}

// Generates simulation steps for the Java Digit Sum code
export function generateDigitSumSimulation(num: number): SimulationStep[] {
  const n = Math.abs(num);
  const steps: SimulationStep[] = [];
  
  steps.push({
    lineId: 1,
    label: 'Program Başlangıcı',
    codeSnippet: `int number = ${n};\nint tempNumber = number;\nint toplam = 0;`,
    variables: {
      number: n,
      tempNumber: n,
      basNumber: n.toString().length,
      basValue: null,
      result: 0,
      iteration: 0
    },
    explanation: `Kullanıcıdan '${n}' sayısı alındı. 'tempNumber' = ${n} ve 'toplam' = 0 olarak başlatıldı.`
  });

  let temp = n;
  let toplam = 0;
  let iter = 1;

  if (temp === 0) {
    steps.push({
      lineId: 4,
      label: 'Sıfır Durumu',
      codeSnippet: `toplam = 0;`,
      variables: {
        number: 0,
        tempNumber: 0,
        basNumber: 1,
        basValue: 0,
        result: 0,
        iteration: 1
      },
      explanation: 'Sayı 0 olduğundan döngüye girmeden sonuç 0 olarak belirlendi.'
    });
    return steps;
  }

  while (temp !== 0) {
    steps.push({
      lineId: 2,
      label: `Döngü Koşulu Kontrolü (#${iter})`,
      codeSnippet: `while (tempNumber != 0) { // tempNumber = ${temp} != 0 (TRUE)`,
      variables: {
        number: n,
        tempNumber: temp,
        basNumber: n.toString().length,
        basValue: null,
        result: toplam,
        iteration: iter
      },
      explanation: `Koşul kontrolü: tempNumber (${temp}) != 0 sağlandığı için döngü gövdesine giriliyor.`
    });

    const basValue = temp % 10;
    steps.push({
      lineId: 3,
      label: `Son Basamağı Bulma (Mod 10)`,
      codeSnippet: `basValue = tempNumber % 10; // ${temp} % 10 = ${basValue}`,
      variables: {
        number: n,
        tempNumber: temp,
        basNumber: n.toString().length,
        basValue: basValue,
        result: toplam,
        iteration: iter
      },
      explanation: `10'a bölme işleminden kalan (% 10) ile en sağdaki basamak (${basValue}) alındı.`
    });

    const prevToplam = toplam;
    toplam += basValue;
    steps.push({
      lineId: 4,
      label: `Toplamı Güncelleme`,
      codeSnippet: `toplam += basValue; // ${prevToplam} + ${basValue} = ${toplam}`,
      variables: {
        number: n,
        tempNumber: temp,
        basNumber: n.toString().length,
        basValue: basValue,
        result: toplam,
        iteration: iter
      },
      explanation: `Mevcut toplam (${prevToplam}) değerine basamak (${basValue}) eklendi -> Yeni Toplam: ${toplam}.`
    });

    const nextTemp = Math.floor(temp / 10);
    steps.push({
      lineId: 5,
      label: `Basamağı Silme (Tam Bölme)`,
      codeSnippet: `tempNumber /= 10; // ${temp} / 10 = ${nextTemp}`,
      variables: {
        number: n,
        tempNumber: nextTemp,
        basNumber: n.toString().length,
        basValue: basValue,
        result: toplam,
        iteration: iter
      },
      explanation: `Sayı 10'a tam bölünerek (${temp} / 10 = ${nextTemp}) en sağdaki basamak atıldı.`
    });

    temp = nextTemp;
    iter++;
  }

  steps.push({
    lineId: 6,
    label: `Döngü Sonu ve Ekrana Yazdırma`,
    codeSnippet: `System.out.println("Basamaklar Toplamı: " + toplam); // Çıktı: ${toplam}`,
    variables: {
      number: n,
      tempNumber: 0,
      basNumber: n.toString().length,
      basValue: null,
      result: toplam,
      iteration: iter - 1
    },
    explanation: `tempNumber = 0 oldu ve döngü bitti. '${n}' sayısının basamakları toplamı: ${toplam}.`
  });

  return steps;
}

// Generates simulation steps for the Armstrong code
export function generateArmstrongSimulation(num: number): SimulationStep[] {
  const n = Math.abs(num);
  const steps: SimulationStep[] = [];
  const basCount = n === 0 ? 1 : n.toString().length;

  steps.push({
    lineId: 1,
    label: 'Program Başlangıcı',
    codeSnippet: `int number = ${n};\nint basNumber = ${basCount};\nint result = 0;`,
    variables: {
      number: n,
      tempNumber: n,
      basNumber: basCount,
      basValue: null,
      basPow: null,
      result: 0,
      iteration: 0
    },
    explanation: `Kullanıcıdan '${n}' sayısı alındı. Sayının ${basCount} basamaklı olduğu belirlendi.`
  });

  let temp = n;
  let result = 0;
  let iter = 1;

  while (temp !== 0) {
    const basValue = temp % 10;
    const basPow = Math.pow(basValue, basCount);
    const prevResult = result;
    result += basPow;
    const nextTemp = Math.floor(temp / 10);

    steps.push({
      lineId: 2,
      label: `Basamak Çekme & Üs Alma (#${iter})`,
      codeSnippet: `basValue = tempNumber % 10; // ${basValue}\nbasPow = Math.pow(${basValue}, ${basCount}); // ${basPow}\nresult += basPow; // ${prevResult} + ${basPow} = ${result}`,
      variables: {
        number: n,
        tempNumber: nextTemp,
        basNumber: basCount,
        basValue: basValue,
        basPow: basPow,
        result: result,
        iteration: iter
      },
      explanation: `${basValue} basamağının ${basCount}. kuvveti (${basValue}^${basCount} = ${basPow}) hesaplandı ve sonuca eklendi.`
    });

    temp = nextTemp;
    iter++;
  }

  const isArm = result === n;
  steps.push({
    lineId: 3,
    label: 'Karşılaştırma & Sonuç',
    codeSnippet: `if (result == number) { // ${result} == ${n} (${isArm ? 'EŞİT - ARMSTRONG' : 'EŞİT DEĞİL'})\n  System.out.println(number + " Armstrong sayıdır.");\n}`,
    variables: {
      number: n,
      tempNumber: 0,
      basNumber: basCount,
      basValue: null,
      basPow: null,
      result: result,
      iteration: iter - 1
    },
    explanation: `Elde edilen toplam (${result}), orijinal sayıya (${n}) ${isArm ? 'eşittir! Sayı ARMSTRONG sayıdır.' : 'eşit DEĞİLDİR. Sayı Armstrong sayı olamaz.'}`
  });

  return steps;
}

export const KNOWN_ARMSTRONG_NUMBERS: { digits: number; numbers: number[] }[] = [
  { digits: 1, numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { digits: 3, numbers: [153, 370, 371, 407] },
  { digits: 4, numbers: [1634, 8208, 9474] },
  { digits: 5, numbers: [54748, 92727, 93084] },
  { digits: 6, numbers: [548834] }
];

export function findArmstrongInRange(start: number, end: number): number[] {
  const s = Math.max(0, Math.min(start, end));
  const e = Math.min(100000, Math.max(start, end));
  const results: number[] = [];

  for (let i = s; i <= e; i++) {
    const sStr = i.toString();
    const len = sStr.length;
    let sum = 0;
    let temp = i;
    
    while (temp > 0) {
      const d = temp % 10;
      sum += Math.pow(d, len);
      temp = Math.floor(temp / 10);
    }
    
    if (sum === i && i > 0) {
      results.push(i);
    }
  }

  return results;
}
