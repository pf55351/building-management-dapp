// SPDX-License-Identifier: None

pragma solidity >=0.8.15;

contract ProposalManagement {
    struct Vote {
        address lodger;
        bool vote;
    }

    struct Proposal {
        string proposal;
        address creator;
        bool isActive;
        bool isPassed;
        uint32 numVotes;
        Vote[] listVotes;
    }

    Proposal[] listProposal;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function hasVoted(uint _index) private view returns (bool) {
        Vote[] memory voteForThisProposal = listProposal[_index].listVotes;
        for (uint i = 0; i < voteForThisProposal.length; i++) {
            Vote memory vote = voteForThisProposal[i];
            if (vote.lodger == msg.sender) return true;
        }
        return false;
    }

    function setNewProposal(string memory _proposal, bool _isActive) public {
        Proposal memory proposal = listProposal.push();
        proposal.proposal = _proposal;
        proposal.creator = msg.sender;
        proposal.isActive = _isActive;
    }

    function setActiveProposal(uint _index) public {
        require(msg.sender == listProposal[_index].creator);
        listProposal[_index].isActive = !listProposal[_index].isActive;
    }

    function setVote(uint _index, bool _vote) public {
        require(hasVoted(_index) == false);
        Vote memory vote = Vote(msg.sender, _vote);
        listProposal[_index].numVotes++;
        listProposal[_index].listVotes.push(vote);
        updateProposal(_index);
    }

    function getProposal(uint _index) public view returns (Proposal memory) {
        return listProposal[_index];
    }

    function updateProposal(uint _index) internal view {
        Proposal memory proposal = listProposal[_index];

        uint numVotes = proposal.numVotes;
        uint numPassed = 0;
        Vote[] memory voteForThisProposal = listProposal[_index].listVotes;
        for (uint i = 0; i < voteForThisProposal.length; i++) {
            Vote memory vote = voteForThisProposal[i];
            if (vote.vote == true) {
                numPassed++;
            }
        }
        proposal.isPassed = (numPassed >= (numVotes / 2) + 1) ? true : false;
    }

    function getProposalStatus(uint _index) public view returns (bool) {
        return listProposal[_index].isActive;
    }
}
