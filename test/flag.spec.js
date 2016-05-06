/*global require, describe, it */
var expect = require('chai').expect;
var Flag = require('../src/flag');

describe('Flag', function() {
    "use strict";

    var keys = [
        'DELETE',
        'INSERT',
        'SELECT',
        'UPDATE',
        'VIEW_DEFINITION'
    ];

    it('should create a new flag type', function() {
        var permissions = new Flag(keys);
        expect(permissions).to.be.a('function');
        expect(permissions).to.have.property('DELETE').and.equals(1);
        expect(permissions).to.have.property('INSERT').and.equals(2);
        expect(permissions).to.have.property('SELECT').and.equals(4);
        expect(permissions).to.have.property('UPDATE').and.equals(8);
        expect(permissions).to.have.property('VIEW_DEFINITION').and.equals(16);
    });

    describe('Permissions flag type', function() {
        var Permissions = new Flag(keys);
        it('should create a new empty flag instance', function() {
            var permissions = new Permissions();
            expect(permissions).to.be.a('object');
            expect(permissions).to.have.property('value').and.equals(0);
        });
        it('should create a new flag instance', function() {
            var permissions = new Permissions(Permissions.DELETE, Permissions.INSERT, Permissions.SELECT, Permissions.UPDATE, Permissions.VIEW_DEFINITION);
            expect(permissions).to.be.a('object');
            expect(permissions).to.have.property('value').and.equals(31);
        });
    })

});