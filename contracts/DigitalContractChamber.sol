// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title DigitalContractChamber
/// @notice AI-powered ERP registry for multi-institution infrastructure projects with on-chain governance.
contract DigitalContractChamber {
    struct Institution {
        string name;
        string metadataURI;
        address admin;
        bool active;
    }

    struct Vertical {
        string name;
        string metadataURI;
        bool active;
    }

    struct Project {
        string name;
        string metadataURI;
        uint256 verticalId;
        address ownerInstitution;
        uint256 createdAt;
        bool active;
    }

    struct BorrowingPool {
        uint256 projectId;
        uint256 targetAmount;
        uint256 totalCommitted;
        uint256 totalRepaid;
        bool open;
    }

    struct PaymentRecord {
        uint256 projectId;
        string processor;
        string reference;
        uint256 amount;
        address payer;
        uint256 timestamp;
    }

    struct AIProfile {
        string modelName;
        string configHash;
        string metadataURI;
    }

    address public owner;

    uint256 public institutionCount;
    uint256 public projectCount;
    uint256 public verticalCount;
    uint256 public borrowingPoolCount;
    uint256 public paymentCount;

    mapping(uint256 => Institution) public institutions;
    mapping(uint256 => Vertical) public verticals;
    mapping(uint256 => Project) public projects;
    mapping(uint256 => BorrowingPool) public borrowingPools;
    mapping(uint256 => PaymentRecord) public payments;

    mapping(uint256 => mapping(address => bool)) public institutionMembers;
    mapping(uint256 => mapping(uint256 => bool)) public projectInstitutionLinks;
    mapping(uint256 => mapping(address => uint256)) public poolContributions;
    mapping(uint256 => AIProfile) public projectAIProfiles;

    event InstitutionRegistered(uint256 indexed institutionId, string name, address indexed admin);
    event InstitutionMemberAdded(uint256 indexed institutionId, address indexed member);
    event VerticalAdded(uint256 indexed verticalId, string name);
    event ProjectCreated(uint256 indexed projectId, uint256 indexed institutionId, uint256 indexed verticalId);
    event InstitutionLinked(uint256 indexed projectId, uint256 indexed institutionId);
    event AIProfileUpdated(uint256 indexed projectId, string modelName, string configHash);
    event PaymentRecorded(uint256 indexed paymentId, uint256 indexed projectId, string processor, uint256 amount);
    event BorrowingPoolOpened(uint256 indexed poolId, uint256 indexed projectId, uint256 targetAmount);
    event BorrowingCommitted(uint256 indexed poolId, address indexed lender, uint256 amount);
    event BorrowingAllocated(uint256 indexed poolId, uint256 amount);
    event BorrowingRepaid(uint256 indexed poolId, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyInstitutionAdmin(uint256 institutionId) {
        require(institutions[institutionId].admin == msg.sender, "Not institution admin");
        _;
    }

    modifier onlyInstitutionMember(uint256 institutionId) {
        require(
            msg.sender == institutions[institutionId].admin || institutionMembers[institutionId][msg.sender],
            "Not institution member"
        );
        _;
    }

    modifier projectExists(uint256 projectId) {
        require(projectId > 0 && projectId <= projectCount, "Unknown project");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerInstitution(
        string calldata name,
        string calldata metadataURI,
        address admin
    ) external onlyOwner returns (uint256) {
        require(admin != address(0), "Admin required");
        institutionCount++;
        institutions[institutionCount] = Institution(name, metadataURI, admin, true);
        emit InstitutionRegistered(institutionCount, name, admin);
        return institutionCount;
    }

    function addInstitutionMember(uint256 institutionId, address member)
        external
        onlyInstitutionAdmin(institutionId)
    {
        require(member != address(0), "Member required");
        institutionMembers[institutionId][member] = true;
        emit InstitutionMemberAdded(institutionId, member);
    }

    function addVertical(string calldata name, string calldata metadataURI)
        external
        onlyOwner
        returns (uint256)
    {
        verticalCount++;
        verticals[verticalCount] = Vertical(name, metadataURI, true);
        emit VerticalAdded(verticalCount, name);
        return verticalCount;
    }

    function createProject(
        uint256 institutionId,
        uint256 verticalId,
        string calldata name,
        string calldata metadataURI
    ) external onlyInstitutionMember(institutionId) returns (uint256) {
        require(verticals[verticalId].active, "Vertical inactive");
        projectCount++;
        projects[projectCount] = Project({
            name: name,
            metadataURI: metadataURI,
            verticalId: verticalId,
            ownerInstitution: institutions[institutionId].admin,
            createdAt: block.timestamp,
            active: true
        });
        projectInstitutionLinks[projectCount][institutionId] = true;
        emit ProjectCreated(projectCount, institutionId, verticalId);
        return projectCount;
    }

    function linkInstitutionToProject(uint256 projectId, uint256 institutionId)
        external
        projectExists(projectId)
        onlyInstitutionMember(institutionId)
    {
        projectInstitutionLinks[projectId][institutionId] = true;
        emit InstitutionLinked(projectId, institutionId);
    }

    function setProjectAIProfile(
        uint256 projectId,
        string calldata modelName,
        string calldata configHash,
        string calldata metadataURI
    ) external projectExists(projectId) {
        projectAIProfiles[projectId] = AIProfile(modelName, configHash, metadataURI);
        emit AIProfileUpdated(projectId, modelName, configHash);
    }

    function recordPayment(
        uint256 projectId,
        string calldata processor,
        string calldata reference,
        uint256 amount
    ) external projectExists(projectId) returns (uint256) {
        paymentCount++;
        payments[paymentCount] = PaymentRecord({
            projectId: projectId,
            processor: processor,
            reference: reference,
            amount: amount,
            payer: msg.sender,
            timestamp: block.timestamp
        });
        emit PaymentRecorded(paymentCount, projectId, processor, amount);
        return paymentCount;
    }

    function openBorrowingPool(uint256 projectId, uint256 targetAmount)
        external
        projectExists(projectId)
        returns (uint256)
    {
        require(targetAmount > 0, "Target required");
        borrowingPoolCount++;
        borrowingPools[borrowingPoolCount] = BorrowingPool({
            projectId: projectId,
            targetAmount: targetAmount,
            totalCommitted: 0,
            totalRepaid: 0,
            open: true
        });
        emit BorrowingPoolOpened(borrowingPoolCount, projectId, targetAmount);
        return borrowingPoolCount;
    }

    function contributeBorrowing(uint256 poolId) external payable {
        BorrowingPool storage pool = borrowingPools[poolId];
        require(pool.open, "Pool closed");
        require(msg.value > 0, "Contribution required");
        pool.totalCommitted += msg.value;
        poolContributions[poolId][msg.sender] += msg.value;
        emit BorrowingCommitted(poolId, msg.sender, msg.value);
    }

    function allocateBorrowing(uint256 poolId, address payable recipient, uint256 amount) external onlyOwner {
        BorrowingPool storage pool = borrowingPools[poolId];
        require(pool.open, "Pool closed");
        require(amount <= address(this).balance, "Insufficient balance");
        pool.open = pool.totalCommitted < pool.targetAmount ? pool.open : false;
        recipient.transfer(amount);
        emit BorrowingAllocated(poolId, amount);
    }

    function repayBorrowing(uint256 poolId) external payable {
        BorrowingPool storage pool = borrowingPools[poolId];
        require(msg.value > 0, "Repayment required");
        pool.totalRepaid += msg.value;
        emit BorrowingRepaid(poolId, msg.value);
    }
}
