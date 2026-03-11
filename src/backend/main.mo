import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

actor {
  type AttendanceStatus = {
    #yes;
    #no;
    #maybe;
  };

  type Rsvp = {
    id : Nat;
    name : Text;
    email : Text;
    status : AttendanceStatus;
    message : Text;
    timestamp : Int;
  };

  module Rsvp {
    public func compare(rsvp1 : Rsvp, rsvp2 : Rsvp) : Order.Order {
      Nat.compare(rsvp1.id, rsvp2.id);
    };

    public func compareByTimestamp(rsvp1 : Rsvp, rsvp2 : Rsvp) : Order.Order {
      Int.compare(rsvp1.timestamp, rsvp2.timestamp);
    };

    public func compareByName(rsvp1 : Rsvp, rsvp2 : Rsvp) : Order.Order {
      Text.compare(rsvp1.name, rsvp2.name);
    };
  };

  let rsvpMap = Map.empty<Nat, Rsvp>();
  var nextRsvpId = 0;

  public shared ({ caller }) func submitRsvp(name : Text, email : Text, status : AttendanceStatus, message : Text) : async () {
    let rsvpId = nextRsvpId;
    let rsvp : Rsvp = {
      id = rsvpId;
      name;
      email;
      status;
      message;
      timestamp = Time.now();
    };

    rsvpMap.add(rsvpId, rsvp);
    nextRsvpId += 1;
  };

  public query ({ caller }) func getAllRsvps() : async [Rsvp] {
    rsvpMap.values().toArray().sort();
  };

  public query ({ caller }) func getRsvpsByStatus(status : AttendanceStatus) : async [Rsvp] {
    let filteredIter = rsvpMap.values().filter(
      func(rsvp) {
        rsvp.status == status;
      }
    );
    filteredIter.toArray();
  };

  public query ({ caller }) func getRsvpStats() : async (Nat, Nat, Nat) {
    var yesCount = 0;
    var noCount = 0;
    var maybeCount = 0;

    rsvpMap.values().forEach(
      func(rsvp) {
        switch (rsvp.status) {
          case (#yes) { yesCount += 1 };
          case (#no) { noCount += 1 };
          case (#maybe) { maybeCount += 1 };
        };
      }
    );
    (yesCount, noCount, maybeCount);
  };

  public query ({ caller }) func getRsvpById(id : Nat) : async Rsvp {
    switch (rsvpMap.get(id)) {
      case (null) { Runtime.trap("RSVP not found") };
      case (?rsvp) { rsvp };
    };
  };
};
