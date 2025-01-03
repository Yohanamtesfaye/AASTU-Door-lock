import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const RfidLogs = () => {
  const { i18n, t } = useTranslation();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    room: '',
    date: ''
  });

  // AASTU theme colors
  const theme = {
    primary: '#C5A02D', // Gold
    secondary: '#1B2F5B', // Navy Blue
    white: '#FFFFFF',
    background: '#F8F9FA',
    border: '#E5E7EB',
    text: {
      primary: '#1B2F5B',
      secondary: '#6B7280',
      white: '#FFFFFF'
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: theme.background
    },
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: theme.secondary,
      color: theme.white,
      borderBottom: `1px solid ${theme.border}`
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    logo: {
      height: '50px',
      width: 'auto'
    },
    headerTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      margin: 0,
      color: theme.primary
    },
    headerSubtitle: {
      fontSize: '0.875rem',
      color: theme.white,
      margin: '0.25rem 0 0 0',
      opacity: 0.9
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1.5rem'
    },
    error: {
      marginBottom: '1.5rem',
      padding: '1rem',
      borderRadius: '0.5rem',
      backgroundColor: 'rgba(220, 38, 38, 0.1)',
      color: '#dc2626'
    },
    card: {
      backgroundColor: theme.white,
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '1.5rem',
      border: `1px solid ${theme.border}`
    },
    cardHeader: {
      padding: '1.5rem',
      borderBottom: `1px solid ${theme.border}`,
      backgroundColor: theme.secondary,
      borderTopLeftRadius: '0.5rem',
      borderTopRightRadius: '0.5rem'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      margin: 0,
      color: theme.white
    },
    filterGrid: {
      padding: '1.5rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.text.primary
    },
    input: {
      padding: '0.75rem',
      border: `1px solid ${theme.border}`,
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      width: '100%',
      transition: 'border-color 0.2s',
      outline: 'none',
      '&:focus': {
        borderColor: theme.primary
      }
    },
    select: {
      padding: '0.75rem',
      border: `1px solid ${theme.border}`,
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      width: '100%',
      backgroundColor: theme.white,
      outline: 'none',
      '&:focus': {
        borderColor: theme.primary
      }
    },
    refreshButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: theme.primary,
      color: theme.white,
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontWeight: 500,
      transition: 'opacity 0.2s',
      '&:hover': {
        opacity: 0.9
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed'
      }
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      padding: '1rem',
      textAlign: 'left',
      fontSize: '0.875rem',
      fontWeight: 500,
      backgroundColor: theme.secondary,
      color: theme.white,
      borderBottom: `1px solid ${theme.border}`
    },
    td: {
      padding: '1rem',
      fontSize: '0.875rem',
      borderBottom: `1px solid ${theme.border}`,
      color: theme.text.primary
    },
    pending: {
      color: theme.primary,
      fontWeight: 500
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '4rem',
      color: theme.text.secondary
    },
    monospace: {
      fontFamily: 'monospace'
    },
    languageDropdown: {
      padding: '0.5rem 1rem',
      backgroundColor: theme.primary,
      color: theme.white,
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      outline: 'none',
      '&:hover': {
        backgroundColor: '#B08E26',
      },
      '&:focus': {
        boxShadow: '0 0 0 2px rgba(197, 160, 45, 0.5)',
      },
    },
    logoutLink: {
      marginLeft: '1rem',
      padding: '0.5rem 1rem',
      backgroundColor: theme.primary,
      color: theme.white,
      textDecoration: 'none',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: '#B08E26',
      },
    }
  
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/rfid-logs');
      setLogs(response.data);
      setError(null);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
      setError('Failed to fetch logs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => {
    const isScanning = log.Name.toLowerCase().includes('scanning'); 
    const nameMatch = log.Name.toLowerCase().includes(filters.name.toLowerCase());
    const roomMatch = !filters.room || log.Room === filters.room;
    const dateMatch = !filters.date || 
      new Date(log.Timestamp).toLocaleDateString() === new Date(filters.date).toLocaleDateString();
    return !isScanning && nameMatch && roomMatch && dateMatch;
  }); 

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-12-26_11-32-57.jpg-hNaE1P2aTRUlvbMWo1zzsVnot9Wjeg.jpeg"
            alt="AASTU Logo" 
            style={styles.logo}
          />
          <div>
            <h1 style={styles.headerTitle}>{t('aastu_topic')}</h1>
            <p style={styles.headerSubtitle}>{t('moniter')}</p>
          </div>
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
            style={styles.languageDropdown}
          >
            <option value="en">🇺🇸 English</option>
            <option value="am">🇪🇹 አማርኛ</option>
          </select>
        </div>
        <Link to='/' style={styles.logoutLink}>
            {t('logout')}
          </Link>
        </div>
      </header>

      <main style={styles.main}>
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>{t('Filters')}</h2>
          </div>
          <div style={styles.filterGrid}>
            <div style={styles.filterGroup}>
              <label style={styles.label}>{t('Search_by_Name')}</label>
              <input
                type="text"
                placeholder={t('Enter name')}
                value={filters.name}
                onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                style={styles.input}
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>{t('Room')}</label>
              <select
                value={filters.room}
                onChange={(e) => setFilters(prev => ({ ...prev, room: e.target.value }))}
                style={styles.select}
              >
                <option value="">{t('allroom')}</option>
                <option value="Room101">Room 101</option>
                <option value="Room102">Room 102</option>
                <option value="Room103">Room 103</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>{t('Date')}</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                style={styles.input}
              />
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={styles.cardTitle}>{t('acess_log')}</h2>
              <button 
                onClick={fetchLogs}
                disabled={loading}
                style={styles.refreshButton}
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            {loading ? (
              <div style={styles.loadingContainer}>
                Loading...
              </div>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>{t('ID')}</th>
                    <th style={styles.th}>{t('UID')}</th>
                    <th style={styles.th}>{t('Name')}</th>
                    <th style={styles.th}>{t('Room')}</th>
                    <th style={styles.th}>{t('Entry_Time')}</th>
                    <th style={styles.th}>{t('Leave_Time')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ ...styles.td, textAlign: 'center' }}>
                        {t('no_log')}
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id}>
                        <td style={styles.td}>{log.id}</td>
                        <td style={{ ...styles.td, ...styles.monospace }}>{log.UID}</td>
                        <td style={styles.td}>{log.Name}</td>
                        <td style={styles.td}>{log.Room}</td>
                        <td style={styles.td}>
                          {new Date(log.Timestamp).toLocaleString()}
                        </td>
                        <td style={styles.td}>
                          {log.LeaveTime ? (
                            new Date(log.LeaveTime).toLocaleString()
                          ) : (
                            <span style={styles.pending}>{t('ongoing')}</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RfidLogs;