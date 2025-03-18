import { NextResponse } from 'next/server';
import { db } from '../../utils/firebase'; 
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'posts'));
    const blogData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(blogData);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
