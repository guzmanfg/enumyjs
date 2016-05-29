/*global require, describe, it */
var expect = require('chai').expect;
var Enum = require('../src/index').Enum;

describe('Enum', function() {
    "use strict";

    var keys = [
        'DELETE',
        'INSERT',
        'SELECT',
        'UPDATE',
        'VIEW_DEFINITION'
    ];

    it('should create a new enum type', function() {
        var permissions = new Enum(keys);
        expect(permissions).to.be.a('function');
        expect(permissions).to.have.property('DELETE').and.equals(1);
        expect(permissions).to.have.property('INSERT').and.equals(2);
        expect(permissions).to.have.property('SELECT').and.equals(3);
        expect(permissions).to.have.property('UPDATE').and.equals(4);
        expect(permissions).to.have.property('VIEW_DEFINITION').and.equals(5);
    });
    describe('Permissions enum type', function() {
        var Permissions = new Enum(keys);
        it('should create a new empty enum instance', function() {
            var permissions = new Permissions();
            expect(permissions).to.be.a('object');
            expect(permissions).to.have.property('value').and.equals(0);
        });
        it('should create a new enum instance', function() {
            var permissions = new Permissions(Permissions.DELETE);
            expect(permissions).to.be.a('object');
            expect(permissions).to.have.property('value').and.equals(1);
        });
    })
});