import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const type: string = data.get('type') as string || 'image'

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 })
    }

    // Validate file type
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/mov', 'video/avi']
    const allowedTypes = type === 'video' ? allowedVideoTypes : allowedImageTypes

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` 
      }, { status: 400 })
    }

    // Validate file size (10MB for images, 50MB for videos)
    const maxSize = type === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `File too large. Max size: ${maxSize / (1024 * 1024)}MB` 
      }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', type === 'video' ? 'videos' : 'images')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate clean filename based on file type and purpose
    const extension = file.name.split('.').pop()?.toLowerCase() || ''
    
    let filename: string
    if (type === 'video') {
      filename = `bg-video.${extension}`
    } else {
      // For images, create descriptive names based on common use cases
      const originalName = file.name.toLowerCase()
      if (originalName.includes('logo')) {
        filename = `logo.${extension}`
      } else if (originalName.includes('hero') || originalName.includes('banner')) {
        filename = `hero-image.${extension}`
      } else if (originalName.includes('bike') || originalName.includes('product')) {
        filename = `bike-${Date.now()}.${extension}`
      } else {
        filename = `image-${Date.now()}.${extension}`
      }
    }
    
    // Check if file exists and append number if needed (except for single-use files like bg-video, logo, hero-image)
    const singleUseFiles = ['bg-video', 'logo', 'hero-image']
    const baseFilename = filename.split('.')[0]
    
    if (!singleUseFiles.includes(baseFilename)) {
      let counter = 1
      let finalFilename = filename
      while (existsSync(join(uploadDir, finalFilename))) {
        const nameWithoutExt = filename.split('.').slice(0, -1).join('.')
        const ext = filename.split('.').pop()
        finalFilename = `${nameWithoutExt}-${counter}.${ext}`
        counter++
      }
      filename = finalFilename
    }
    
    const filepath = join(uploadDir, filename)

    // Write file to disk
    await writeFile(filepath, buffer)

    // Return file info
    const fileUrl = `/uploads/${type === 'video' ? 'videos' : 'images'}/${filename}`
    
    return NextResponse.json({
      success: true,
      filename,
      url: fileUrl,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

// Get uploaded files
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    
    const { readdir, stat } = await import('fs/promises')
    const { join } = await import('path')
    const { existsSync } = await import('fs')
    
    const files: any[] = []
    
    // Check images directory
    if (type === 'all' || type === 'image') {
      const imagesDir = join(process.cwd(), 'public', 'uploads', 'images')
      if (existsSync(imagesDir)) {
        const imageFiles = await readdir(imagesDir)
        for (const filename of imageFiles) {
          const filepath = join(imagesDir, filename)
          const stats = await stat(filepath)
          const ext = filename.toLowerCase().split('.').pop()
          const mimeTypes: { [key: string]: string } = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'webp': 'image/webp'
          }
          
          if (mimeTypes[ext || '']) {
            files.push({
              id: filename,
              filename,
              url: `/uploads/images/${filename}`,
              type: mimeTypes[ext || ''],
              size: stats.size,
              uploadedAt: stats.mtime.toISOString()
            })
          }
        }
      }
    }
    
    // Check videos directory
    if (type === 'all' || type === 'video') {
      const videosDir = join(process.cwd(), 'public', 'uploads', 'videos')
      if (existsSync(videosDir)) {
        const videoFiles = await readdir(videosDir)
        for (const filename of videoFiles) {
          const filepath = join(videosDir, filename)
          const stats = await stat(filepath)
          const ext = filename.toLowerCase().split('.').pop()
          const mimeTypes: { [key: string]: string } = {
            'mp4': 'video/mp4',
            'webm': 'video/webm',
            'mov': 'video/mov',
            'avi': 'video/avi'
          }
          
          if (mimeTypes[ext || '']) {
            files.push({
              id: filename,
              filename,
              url: `/uploads/videos/${filename}`,
              type: mimeTypes[ext || ''],
              size: stats.size,
              uploadedAt: stats.mtime.toISOString()
            })
          }
        }
      }
    }
    
    // Sort by upload date (newest first)
    files.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())

    return NextResponse.json({
      success: true,
      files
    })

  } catch (error) {
    console.error('Get files error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    )
  }
}

// Delete uploaded file
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')
    const type = searchParams.get('type')

    if (!filename || !type) {
      return NextResponse.json({ error: 'Missing filename or type' }, { status: 400 })
    }

    const { unlink } = await import('fs/promises')
    const { existsSync } = await import('fs')
    
    const filepath = join(
      process.cwd(), 
      'public', 
      'uploads', 
      type === 'video' ? 'videos' : 'images', 
      filename
    )

    // Check if file exists before trying to delete
    if (existsSync(filepath)) {
      await unlink(filepath)
      return NextResponse.json({
        success: true,
        message: 'File deleted successfully'
      })
    } else {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}