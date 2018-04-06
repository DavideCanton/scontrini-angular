import { JsonMapper, JsonProperty, JsonClass, JsonComplexProperty } from './json-mapper';

@JsonClass()
class Address {
    @JsonProperty()
    line1: string;

    @JsonProperty()
    line2: string;

    constructor() {
        this.line1 = undefined;
        this.line2 = undefined;
    }
}

enum Sesso {
    M = 0, F = 1
}

@JsonClass()
class Person {

    @JsonProperty()
    firstName: string;

    @JsonProperty(Person.mapLastName)
    lastName: string;

    @JsonProperty('eta')
    age: number;

    @JsonProperty()
    sex: Sesso;

    @JsonComplexProperty(Address)
    address: Address;

    constructor() {
        this.firstName = undefined;
        this.lastName = undefined;
        this.age = undefined;
        this.address = undefined;
        this.sex = undefined;
    }

    static mapLastName(s: string) : string {
        return s.toUpperCase();
    }
}


describe("Mapper tests", () => {
    it("should map", () => {
        let obj = {
            firstName: 'Piero',
            lastName: 'Gorgi',
            eta: 16,
            sex: 1,
            address: {
                line1: 'a',
                line2: 'b'
            }
        };

        let p = JsonMapper.deserialize(Person, obj);

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
});