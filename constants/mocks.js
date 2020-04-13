const categories = [

]

const profile = {
    username: 'alek',
    password: '12345',
    email: 'alek.osadin@yandex.ru',
    avatar: require('../assets/images/avatar.png'),
    budget: 1000,
    notification: true
}

const cardData = [
    {
        id: 1,
        title: 'Кард 1',
        icon: require('../assets/icons/plants.png')
    },
    {
        id: 2,
        title: 'Кард 2',
        icon: require('../assets/icons/pots.png')
    },
    {
        id: 3,
        title: 'Кард 3',
        icon: require('../assets/icons/seeds.png')
    },
]

export {
    categories,
    profile,
    cardData
}