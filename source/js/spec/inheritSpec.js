/*
*
*   Spec/Inherit
*
*   @author Yuji Ito @110chang
*
*/

define([
  'mod/inherit'
], function(inherit) {
  describe("Test case: Inherit", function() {
    var Person, SuperPerson, Hentai, Newtype;

    beforeEach(function () {
      Person = {
        health: 100,
        strength: 120,
        
        init: function (health, strength) {
          //console.log('hoge');
          this.health = health || 100;
          this.strength = strength || 120;

          return this;
        },
        attack: function () {
          return 'attack! ' + this.strength;
        },
        defend: function () {
          return 'defend ' + this.health;
        }
      };
      
      SuperPerson = inherit(Person, {
        init: function (health, strength) {
          health = health || 140;
          strength = strength || 200;
          Person.init.call(this, health, strength);

          return this;
        },
        attack: function () {
          return 'super attack! ' + this.strength;
        },
      });
      
      Hentai = inherit(Person, {
        init: function (health) {
          health = health || 1000;
          Person.init.call(this, health);

          return this;
        },
        attack: function () {
          return 'hentai attack! ' + this.strength;
        },
      });
    });

    it('can create new object', function () {
      var person = inherit(Person).init();
      expect(person.health).toEqual(100);
      expect(person.strength).toEqual(120);
      expect(person.attack()).toEqual('attack! 120');
      expect(person.defend()).toEqual('defend 100');
    });
    
    it('can inherit object and change value of member', function () {
      var superPerson = inherit(SuperPerson).init();
      expect(superPerson.health).toEqual(140);
      expect(superPerson.strength).toEqual(200);
      expect(superPerson.attack()).toEqual('super attack! 200');
      expect(superPerson.defend()).toEqual('defend 140');
      
      var hentai = inherit(Hentai).init();
      expect(hentai.health).toEqual(1000);
      expect(hentai.strength).toEqual(120);
      expect(hentai.attack()).toEqual('hentai attack! 120');
      expect(hentai.defend()).toEqual('defend 1000');
    });
    
    it('can extends properties', function () {
      //console.log(Person.extend);
      Newtype = inherit(Person, {
        psycomu: true
      });
      
      expect(Newtype.psycomu).toBeTruthy();
    });
  }); 
});