import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Form16Upload.module.css';

const MOCK_SCAN_STAGES = [
  "Initializing OCR Engine...",
  "Reading Part A (Employer Details)...",
  "Extracting Part B (Gross Salary)...",
  "Identifying Section 10 Exemptions...",
  "Locating Section 80C Deductions...",
  "Finalizing Tax Profile...",
  "Success! Parsing Complete."
];

export default function Form16Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStage, setScanStage] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef(null);
  
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startSimulatedScan();
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      startSimulatedScan();
    }
  };

  const startSimulatedScan = () => {
    setIsScanning(true);
    setScanStage(0);
    
    // Simulate OCR scanning process
    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage += 1;
      if (currentStage < MOCK_SCAN_STAGES.length - 1) {
        setScanStage(currentStage);
      } else {
        clearInterval(interval);
        setScanStage(MOCK_SCAN_STAGES.length - 1);
        setTimeout(() => {
          setIsScanning(false);
          setIsSuccess(true);
          
          // Pre-fill the wizard state with mock data from the "Form 16" by serializing to URL query parameters
          const mockData = {
            monthlyTakeHome: 125000,
            basicSalary: 75000,
            hraReceived: 30000,
            specialAllowance: 20000,
            lta: 0,
            otherAllowances: 10000,
            employeePFMonthly: 9000,
            professionalTax: 200,
            ageCategory: 'below60',
            cityType: 'metro',
            rentPaid: 25000,
            homeLoanInterest: 0,
            employerNPS: 0,
            section80C: 150000,
            npsSelf: 50000,
            healthInsurance: 25000,
            educationLoan: 0,
            otherIncome: 0,
            mealCoupons: 0
          };

          const params = new URLSearchParams();
          Object.entries(mockData).forEach(([key, val]) => {
            params.set(key, String(val));
          });

          // Redirect to the calculator after a brief success pause
          setTimeout(() => {
            navigate({ pathname: '/calculate', search: '?' + params.toString() });
          }, 1500);

        }, 1000);
      }
    }, 800);
  };

  return (
    <div className={styles.uploadContainer}>
      <h1 className={styles.uploadTitle}>Magic Form 16 Upload</h1>
      <p className={styles.uploadSubtitle}>
        Drop your Form 16 PDF here. We'll automatically extract your salary structure, 
        exemptions, and deductions, and build your custom tax profile in seconds.
      </p>

      <div 
        className={`${styles.dropzone} ${dragActive ? styles.dragActive : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isScanning && inputRef.current.click()}
      >
        <input 
          ref={inputRef}
          type="file" 
          accept=".pdf" 
          onChange={handleChange} 
          style={{ display: 'none' }} 
        />
        
        {!isScanning && !isSuccess && (
          <>
            <div className={styles.uploadIcon}>📄</div>
            <div className={styles.uploadText}>Drag & drop your Form 16</div>
            <div className={styles.uploadSubtext}>or click to browse files (PDF only)</div>
          </>
        )}

        {isScanning && (
          <div className={styles.scanningOverlay}>
            <div className={styles.scanLine}></div>
            <div className={styles.uploadIcon}>🔍</div>
            <div className={styles.uploadText}>Scanning Document...</div>
            <div className={styles.scanningText}>
              {MOCK_SCAN_STAGES[scanStage]}
            </div>
          </div>
        )}

        {isSuccess && (
          <div className={styles.successOverlay}>
            <div className={styles.successIcon}>✓</div>
            <div className={styles.successText}>Extraction Successful!</div>
            <div className={styles.uploadSubtext} style={{marginTop: '8px', color: 'var(--color-navy-900)'}}>
              Redirecting to your pre-filled tax profile...
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem', fontSize: '14px', color: 'var(--color-text-muted)' }}>
        🔒 Browser-only processing. Your document never leaves your device.
      </div>
    </div>
  );
}
