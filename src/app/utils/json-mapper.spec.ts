import { JsonMapper, JsonProperty, JsonComplexProperty, JsonClass, JsonSerializable } from './json-mapper';

@JsonClass
class Address implements JsonSerializable {
    @JsonProperty()
    line1 = '';

    @JsonProperty()
    line2 = '';

    serialize: () => string;
}

enum Sesso {
    M = 0, F = 1
}

@JsonClass
class Person implements JsonSerializable {
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

    serialize: () => string;

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
            }
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
            }
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
    });
});
