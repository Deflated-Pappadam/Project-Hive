// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract FishTank {
    struct Idea {
        address innovator;
        uint[3] milestones;
        uint invested;
        uint claimed;
        uint startAt;
        uint endAt;
        bool completed;
    }

    uint public count;
    uint public maxDuration;
    address owner;

    mapping(uint => Idea) public ideas;
    mapping(uint => mapping(address => uint)) public totalInvested;

    event Launch(
        uint id,
        address indexed creator,
        uint[3] milestones,
        uint256 startAt,
        uint32 endAt
    );
    event Cancel(uint id);
    event Invest(uint indexed id, address indexed caller, uint amount);
    event Refund(uint id, address indexed caller, uint amount);

    constructor() {
        owner = msg.sender;
        maxDuration = 2592000;
    }

    function launch(uint[3] memory _milestones, uint32 _endAt) external {
        require(_endAt > block.timestamp,"End time is less than Start time");
        require(_endAt <= block.timestamp + maxDuration, "End time exceeds the maximum Duration");

        ideas[count] = Idea({
            innovator: msg.sender,
            milestones: _milestones,
            claimed: 0,
            invested: 0,
            startAt: block.timestamp,
            endAt: _endAt,
            completed: false
        });
        count += 1;

        emit Launch(count,msg.sender,_milestones,block.timestamp,_endAt);
    }

    function cancel(uint _id) external {
        Idea memory idea = ideas[_id];
        require(idea.innovator == msg.sender || idea.innovator == owner, "You did not create this Campaign");
        require(block.timestamp < idea.startAt, "Campaign has already started");

        delete ideas[_id];
        emit Cancel(_id);
    }

    function invest(uint _id) payable external {
        Idea storage idea = ideas[_id];
        require(msg.value > 0, "Cannot invest nothing!");
        require(block.timestamp <= idea.endAt, "Campaign has already ended");
        idea.invested += msg.value;
        totalInvested[_id][msg.sender] += msg.value;
        emit Invest(_id, msg.sender, msg.value);
    }

    function withdraw(uint _id) public {
        Idea storage idea = ideas[_id];
        for (uint i = 2; i >= 0; i--) {
            if (idea.invested >= idea.milestones[i]) {
                (bool sentToInnovator, ) = payable(idea.innovator).call{value: idea.invested * (1 wei)}("");
                require(sentToInnovator, "Failed To Withdraw The Funds");
                if (sentToInnovator) {
                    idea.claimed += idea.invested;
                    if (i==2) {
                        idea.completed = true;
                    }
                }
            }
        }
    }


    function refund(uint _id) external {
        Idea memory idea = ideas[_id];
        require(block.timestamp > idea.endAt, "not ended");

        uint bal = totalInvested[_id][msg.sender];
        totalInvested[_id][msg.sender] = 0;
        (bool sent,) = payable(idea.innovator).call{value: (idea.invested-5) * (1 wei)}("");
        if(sent) {
            idea.completed = true;
        }

        emit Refund(_id, msg.sender, bal);
    }

}