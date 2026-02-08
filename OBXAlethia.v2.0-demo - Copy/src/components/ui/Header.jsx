import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const userMenuRef = useRef(null);
  const quickActionsRef = useRef(null);

  const navigationItems = [
    { label: 'Dashboard', path: '/executive-dashboard', icon: 'LayoutDashboard' },
    { label: 'Contracts', path: '/smart-contract-manager', icon: 'FileText' },
    { label: 'Boardroom', path: '/virtual-boardroom', icon: 'Users' },
    { label: 'Analytics', path: '/portfolio-analytics', icon: 'TrendingUp' },
  ];

  const moreMenuItems = [
    { label: 'Transactions', path: '/transaction-monitor', icon: 'ArrowLeftRight' },
    { label: 'Compliance', path: '/compliance-dashboard', icon: 'Shield' },
  ];

  const statusCounts = {
    '/smart-contract-manager': { count: 3, type: 'warning' },
    '/transaction-monitor': { count: 7, type: 'info' },
    '/compliance-dashboard': { count: 2, type: 'critical' },
  };

  const quickActions = [
    { label: 'Deploy Contract', icon: 'Plus', action: () => navigate('/smart-contract-manager') },
    { label: 'Generate Report', icon: 'FileText', action: () => navigate('/portfolio-analytics') },
    { label: 'New Transaction', icon: 'ArrowLeftRight', action: () => navigate('/transaction-monitor') },
    { label: 'Compliance Check', icon: 'Shield', action: () => navigate('/compliance-dashboard') },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setUserMenuOpen(false);
      }
      if (quickActionsRef?.current && !quickActionsRef?.current?.contains(event?.target)) {
        setQuickActionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <>
      <header className="nav-header">
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <div className="nav-logo-container cursor-pointer" onClick={() => navigate('/executive-dashboard')}>
              <div className="nav-logo">
                <Icon name="Hexagon" size={24} color="var(--color-secondary)" />
              </div>
              <span className="nav-logo-text hidden sm:inline">OBXAlethia</span>
            </div>

            <nav className="hidden lg:flex items-center gap-2">
              {navigationItems?.map((item) => (
                <div key={item?.path} className="relative">
                  <button
                    onClick={() => handleNavigation(item?.path)}
                    className={`nav-item flex items-center gap-2 ${isActive(item?.path) ? 'active' : ''}`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </button>
                  {statusCounts?.[item?.path] && (
                    <span className={`status-badge ${statusCounts?.[item?.path]?.type}`}>
                      {statusCounts?.[item?.path]?.count}
                    </span>
                  )}
                </div>
              ))}

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="nav-item flex items-center gap-2"
                >
                  <Icon name="MoreHorizontal" size={18} />
                  <span>More</span>
                </button>
                {userMenuOpen && (
                  <div
                    ref={userMenuRef}
                    className="absolute top-full mt-2 right-0 w-56 glass-surface rounded-lg elevation-3 py-2 animate-scale-in"
                    style={{ zIndex: 1100 }}
                  >
                    {moreMenuItems?.map((item) => (
                      <div key={item?.path} className="relative">
                        <button
                          onClick={() => {
                            handleNavigation(item?.path);
                            setUserMenuOpen(false);
                          }}
                          className={`w-full nav-item flex items-center gap-3 text-left ${
                            isActive(item?.path) ? 'active' : ''
                          }`}
                        >
                          <Icon name={item?.icon} size={18} />
                          <span>{item?.label}</span>
                        </button>
                        {statusCounts?.[item?.path] && (
                          <span className={`status-badge ${statusCounts?.[item?.path]?.type}`} style={{ right: '12px' }}>
                            {statusCounts?.[item?.path]?.count}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <UserProfile />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden nav-item p-2"
              aria-label="Toggle mobile menu"
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-lg z-[999] lg:hidden animate-fade-in"
          style={{ top: '64px' }}
        >
          <nav className="container mx-auto px-6 py-8 flex flex-col gap-2">
            {[...navigationItems, ...moreMenuItems]?.map((item) => (
              <div key={item?.path} className="relative">
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full nav-item flex items-center gap-3 text-left ${
                    isActive(item?.path) ? 'active' : ''
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </button>
                {statusCounts?.[item?.path] && (
                  <span className={`status-badge ${statusCounts?.[item?.path]?.type}`} style={{ right: '12px' }}>
                    {statusCounts?.[item?.path]?.count}
                  </span>
                )}
              </div>
            ))}

            <div className="mt-8 pt-8 border-t border-border">
              <UserProfile />
            </div>
          </nav>
        </div>
      )}
      <div className="quick-actions-fab" ref={quickActionsRef}>
        <button
          onClick={() => setQuickActionsOpen(!quickActionsOpen)}
          className="fab-button"
          aria-label="Quick actions"
        >
          <Icon name={quickActionsOpen ? 'X' : 'Zap'} size={24} color="white" />
        </button>

        {quickActionsOpen && (
          <div className="absolute bottom-full mb-4 right-0 w-64 glass-surface rounded-lg elevation-4 py-2 animate-scale-in">
            {quickActions?.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action?.action();
                  setQuickActionsOpen(false);
                }}
                className="w-full nav-item flex items-center gap-3 text-left"
              >
                <Icon name={action?.icon} size={18} />
                <span>{action?.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userActions = [
    { label: 'Profile Settings', icon: 'User', action: () => console.log('Profile') },
    { label: 'Security', icon: 'Lock', action: () => console.log('Security') },
    { label: 'Preferences', icon: 'Settings', action: () => console.log('Preferences') },
    { label: 'Sign Out', icon: 'LogOut', action: () => console.log('Sign out') },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="user-profile-trigger"
        aria-label="User menu"
      >
        <div className="user-avatar">JD</div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-foreground">John Doe</div>
          <div className="text-xs text-muted-foreground">C-Suite Executive</div>
        </div>
        <Icon name="ChevronDown" size={16} className="hidden sm:block" />
      </button>
      {isOpen && (
        <div
          className="absolute top-full mt-2 right-0 w-64 glass-surface rounded-lg elevation-3 py-2 animate-scale-in"
          style={{ zIndex: 1100 }}
        >
          <div className="px-4 py-3 border-b border-border">
            <div className="text-sm font-medium text-foreground">John Doe</div>
            <div className="text-xs text-muted-foreground">john.doe@obxalethia.com</div>
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-success/20 text-success">
              <Icon name="Shield" size={12} />
              <span>Verified</span>
            </div>
          </div>

          {userActions?.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action?.action();
                setIsOpen(false);
              }}
              className="w-full nav-item flex items-center gap-3 text-left"
            >
              <Icon name={action?.icon} size={18} />
              <span>{action?.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
