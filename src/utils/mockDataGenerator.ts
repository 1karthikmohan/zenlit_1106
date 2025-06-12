import { nanoid } from 'nanoid';
import { User, Post } from '../types';
import {
  maleFirstNames,
  femaleFirstNames,
  lastNames,
  maleBios,
  femaleBios,
  interests,
  postCaptions
} from '../data/mockData';

function generateUser(gender: 'male' | 'female', index: number): User {
  const id = nanoid();
  const firstName = gender === 'male' 
    ? maleFirstNames[index % maleFirstNames.length]
    : femaleFirstNames[index % femaleFirstNames.length];
  const lastName = lastNames[index % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${index}`;
  
  const userInterests = Array.from({ length: 3 }, () => 
    interests[Math.floor(Math.random() * interests.length)]
  );

  return {
    id,
    name,
    dpUrl: `https://i.pravatar.cc/300?img=${index}${gender === 'male' ? 'm' : 'f'}`,
    bio: gender === 'male' 
      ? maleBios[index % maleBios.length]
      : femaleBios[index % femaleBios.length],
    gender,
    age: Math.floor(Math.random() * (45 - 18) + 18),
    distance: Math.floor(Math.random() * 250),
    interests: Array.from(new Set(userInterests)),
    links: {
      Twitter: `https://twitter.com/${username}`,
      Instagram: `https://instagram.com/${username}`,
      LinkedIn: `https://linkedin.com/in/${username}`,
    }
  };
}

export const mockUsers = {
  male: Array.from({ length: 10 }, (_, i) => generateUser('male', i)),
  female: Array.from({ length: 10 }, (_, i) => generateUser('female', i))
};

export function generatePosts(user: User): Post[] {
  return Array.from({ length: 6 }, () => ({
    id: nanoid(),
    userId: user.id,
    userName: user.name,
    userDpUrl: user.dpUrl,
    title: `Post by ${user.name}`,
    mediaUrl: `https://picsum.photos/800/600?random=${nanoid()}`,
    caption: postCaptions[Math.floor(Math.random() * postCaptions.length)],
    timestamp: new Date().toISOString()
  }));
}