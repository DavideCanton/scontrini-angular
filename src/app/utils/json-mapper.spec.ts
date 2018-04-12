import {
    JsonMapper, JsonProperty, JsonComplexProperty, JsonClass, JsonSerializable,
    SerializeFn, JsonArray, JsonArrayOfComplexProperty
} from './json-mapper';

@JsonClass
class Address {
    @JsonProperty()
    line1 = '';

    @JsonProperty()
    line2 = '';

    serialize: SerializeFn;
}

enum Sesso {
    M = 0, F = 1
}

@JsonClass
class Person {
    @JsonProperty()
    firstName = '';

    @JsonProperty(Person.mapLastName)
    lastName = '';

    @JsonProperty('eta')
    age = -1;

    @JsonProperty()
    sex: Sesso = Sesso.M;

    @JsonComplexProperty(Address)
    address: Address = new Address();

    @JsonArrayOfComplexProperty(Address)
    prevAddresses: Address[] = [];

    serialize: SerializeFn;

    static mapLastName(s: string): string {
        return s.toUpperCase();
    }
}


describe('Mapper tests', () => {
    it('should deserialize', () => {
        const obj = {
            firstName: 'Piero',
            lastName: 'Gorgi',
            eta: 16,
            sex: 1,
            address: {
                line1: 'a',
                line2: 'b'
            },
            prevAddresses: [
                {
                    line1: 'c',
                    line2: 'd'
                },
                {
                    line1: 'e',
                    line2: 'f'
                }
            ]
        };

        const p = JsonMapper.deserialize(Person, obj);

        expect(p).toBeTruthy();
        expect(p.address).toBeTruthy();

        expect(p instanceof Person).toBeTruthy();
        expect(p.address instanceof Address).toBeTruthy();

        expect(p.firstName).toBe(obj.firstName);
        expect(p.lastName).toBe(obj.lastName.toUpperCase());
        expect(p.age).toBe(obj.eta);
        expect(p.sex).toBe(Sesso.F);
        expect(p.address.line1).toBe(obj.address.line1);
        expect(p.address.line2).toBe(obj.address.line2);

        expect(p.prevAddresses.length).toBe(obj.prevAddresses.length);

        expect(p.prevAddresses[0].line1).toBe(obj.prevAddresses[0].line1);
        expect(p.prevAddresses[0].line2).toBe(obj.prevAddresses[0].line2);

        expect(p.prevAddresses[1].line1).toBe(obj.prevAddresses[1].line1);
        expect(p.prevAddresses[1].line2).toBe(obj.prevAddresses[1].line2);
    });

    it('should serialize', () => {
        const obj = {
            firstName: 'Piero',
            lastName: 'Gorgi',
            eta: 16,
            sex: 1,
            address: {
                line1: 'a',
                line2: 'b'
            },
            prevAddresses: [
                {
                    line1: 'c',
                    line2: 'd'
                },
                {
                    line1: 'e',
                    line2: 'f'
                }
            ]
        };

        const p = JsonMapper.deserialize(Person, obj);

        const s = p.serialize();

        const p2 = JsonMapper.deserialize(Person, s);

        expect(p2.firstName).toBe(p.firstName);
        expect(p2.lastName).toBe(p.lastName);
        expect(p2.age).toBe(p.age);
        expect(p2.sex).toBe(p.sex);
        expect(p2.address.line1).toBe(p.address.line1);
        expect(p2.address.line2).toBe(p.address.line2);
        expect(p2.prevAddresses.length).toBe(p.prevAddresses.length);
        expect(p2.prevAddresses[0].line1).toBe(p.prevAddresses[0].line1);
        expect(p2.prevAddresses[0].line2).toBe(p.prevAddresses[0].line2);
        expect(p2.prevAddresses[1].line1).toBe(p.prevAddresses[1].line1);
        expect(p2.prevAddresses[1].line2).toBe(p.prevAddresses[1].line2);
    });
});
