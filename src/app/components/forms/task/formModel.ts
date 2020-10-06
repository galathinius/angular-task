export interface Client {
    id: number;
    name: string;
    lastName: string;
    birthday: string; // sa fie date timepicker 
    address: Address[]; // sa fie nested form dinamica cu editare si stergere, cu buton add new address
    phone: string; // validare regExp formatul moldovei daca reusiti  exemplu :+37369001122
    email: string; // validare email
}


interface Address {
    addressLine1: string;
    addressLine2: string;
    countryCode: string; // Sa fie select, unde value este country.code din lista de tari anexata
    city: string;
    zipCode: string;
    isMainAddress: boolean; // Sa fie un toggle switch, atentie doar o singura adresa poate fi main address!! 
};



