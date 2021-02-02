String.currency_symbols = {
    'USD': '$', // US Dollar
    'AUD':	'A$',
    'CAD':	'C$',
    'HKD':	'HK$',
    'NZD':	'NZ$',
    'CZK':	'Kč',
    'CNY':	'C¥',
    'COP':	'COP$',
    'SGD':	'S$',
    'HUF':	'Ft', // Hungarian Forint
    'EUR': '€', // Euro
    'TRY': '₺', // Turkish Lira
    'CRC': '₡', // Costa Rican Colón
    'GBP': '£', // British Pound Sterling
    'ILS': '₪', // Israeli New Sheqel
    'INR': '₹', // Indian Rupee
    'JPY': 'J¥', // Japanese Yen
    'KRW': '₩', // South Korean Won
    'NGN': '₦', // Nigerian Naira
    'PHP': '₱', // Philippine Peso
    'PLN': 'zł', // Polish Zloty
    'PYG': '₲', // Paraguayan Guarani
    'RON': 'lei', // Romanian New Lei
    'THB': '฿', // Thai Baht
    'UAH': '₴', // Ukrainian Hryvnia
    'VND': '₫', // Vietnamese Dong
};

module.exports=function(){
    var tuc=this.toUpperCase();
    return String.currency_symbols[tuc]||tuc;
}
