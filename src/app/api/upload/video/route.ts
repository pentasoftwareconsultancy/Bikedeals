import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('video') as unknown as File

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' })
    }

    // Validate file type
    if (!file.type.startsWith('video/')) {
      return NextResponse.json({ success: false, error: 'File must be a video' })
    }

    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      return NextResponse.json({ success: false, error: 'File size must be less than 50MB' })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'videos')
    await mkdir(uploadsDir, { recursive: true })

    // Generate clean filename based on file type
    const extension = path.extname(file.name).toLowerCase()
    const filename = `bg-video${extension}`
    const filepath = path.join(uploadsDir, filename)

    // Write file to disk
    await writeFile(filepath, buffer)

    // Return the public URL
    const publicUrl = `/uploads/videos/${filename}`

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: filename
    })
  } catch (error) {
    console.error('Error uploading video:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to upload video' 
    })
  }
}