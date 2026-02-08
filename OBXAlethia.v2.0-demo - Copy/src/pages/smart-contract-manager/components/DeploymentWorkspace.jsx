import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DeploymentWorkspace = ({ selectedTemplate, onClose, onDeploy }) => {
  const [contractName, setContractName] = useState('');
  const [signatories, setSignatories] = useState('');
  const [requiredSignatures, setRequiredSignatures] = useState('2');
  const [autoExecute, setAutoExecute] = useState(false);
  const [gasPrice, setGasPrice] = useState('medium');
  const [estimatedCost, setEstimatedCost] = useState('0.0245 ETH');

  const gasPriceOptions = [
    { value: 'low', label: 'Low (15 Gwei) - ~10 min', description: 'Estimated: 0.0189 ETH' },
    { value: 'medium', label: 'Medium (25 Gwei) - ~3 min', description: 'Estimated: 0.0245 ETH' },
    { value: 'high', label: 'High (40 Gwei) - ~30 sec', description: 'Estimated: 0.0398 ETH' }
  ];

  const signatureOptions = [
    { value: '1', label: '1 of N (Single Signature)' },
    { value: '2', label: '2 of N (Dual Signature)' },
    { value: '3', label: '3 of N (Triple Signature)' },
    { value: 'all', label: 'All Parties Required' }
  ];

  const handleDeploy = () => {
    const deploymentData = {
      template: selectedTemplate,
      contractName,
      signatories: signatories?.split(',')?.map(s => s?.trim()),
      requiredSignatures,
      autoExecute,
      gasPrice,
      estimatedCost
    };
    onDeploy(deploymentData);
  };

  return (
    <div className="glass-surface rounded-lg p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
            <Icon name={selectedTemplate?.icon} size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Deploy Contract</h2>
            <p className="text-sm text-muted-foreground">{selectedTemplate?.name}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-muted/20 rounded-lg transition-colors">
          <Icon name="X" size={20} />
        </button>
      </div>
      <div className="space-y-4">
        <Input
          label="Contract Name"
          type="text"
          placeholder="e.g., Series A Investment Agreement 2025"
          description="Unique identifier for this contract deployment"
          value={contractName}
          onChange={(e) => setContractName(e?.target?.value)}
          required
        />

        <Input
          label="Signatories"
          type="text"
          placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb, 0x8ba1f109551bD432803012645Ac136ddd64DBA72"
          description="Comma-separated wallet addresses of all parties"
          value={signatories}
          onChange={(e) => setSignatories(e?.target?.value)}
          required
        />

        <Select
          label="Multi-Signature Requirement"
          description="Number of signatures required for execution"
          options={signatureOptions}
          value={requiredSignatures}
          onChange={setRequiredSignatures}
        />

        <Select
          label="Gas Price Priority"
          description="Higher priority = faster confirmation"
          options={gasPriceOptions}
          value={gasPrice}
          onChange={(val) => {
            setGasPrice(val);
            const costs = { low: '0.0189 ETH', medium: '0.0245 ETH', high: '0.0398 ETH' };
            setEstimatedCost(costs?.[val]);
          }}
        />

        <div className="glass-surface-light rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Estimated Deployment Cost</span>
            <span className="text-lg font-bold text-secondary">{estimatedCost}</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-muted-foreground">Base Fee:</span>
              <p className="font-medium text-foreground">0.0145 ETH</p>
            </div>
            <div>
              <span className="text-muted-foreground">Gas Fee:</span>
              <p className="font-medium text-foreground">0.0080 ETH</p>
            </div>
            <div>
              <span className="text-muted-foreground">Priority:</span>
              <p className="font-medium text-foreground">0.0020 ETH</p>
            </div>
          </div>
        </div>

        <Checkbox
          label="Enable Automated Execution"
          description="Contract will execute automatically when all conditions are met"
          checked={autoExecute}
          onChange={(e) => setAutoExecute(e?.target?.checked)}
        />

        <div className="glass-surface-light rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="AlertCircle" size={20} color="var(--color-warning)" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground mb-1">Compliance Check</h4>
              <p className="text-xs text-muted-foreground mb-2">
                This contract requires the following regulatory compliance:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate?.compliance?.map((req, index) => (
                  <span key={index} className="px-2 py-1 rounded text-xs bg-success/20 text-success flex items-center gap-1">
                    <Icon name="CheckCircle" size={12} />
                    {req}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            variant="default" 
            iconName="Rocket" 
            iconPosition="left"
            onClick={handleDeploy}
            disabled={!contractName || !signatories}
            className="flex-1"
          >
            Deploy Contract
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeploymentWorkspace;
