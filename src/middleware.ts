import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value }) =>
            supabaseResponse.cookies.set(name, value)
          )
        },
      },
    }
  )

  const isAuthRoute = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/sign-up"

  if(isAuthRoute) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if(user) {
      return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL))
    }
  }

  // Add so that if a user has business ideas it takes them to the dashboard, if not it'll take them to the create business idea page
  // Example
  // const { searchParams, pathname } = new URL(request.url)
  
  // if(!searchParams.get("ideaId") && pathname === "/dashboard/ideas") {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser()
  //   if(user) {
  //     return NextResponse.redirect(new URL("/dashboard/ideas", process.env.NEXT_PUBLIC_APP_URL))
  //   }
  //    If user has business idea then add the url to that business idea
  //    if(user) {
  //      const { data: businessIdeas } = await supabase.from("business_ideas").select("*").eq("user_id", user.id)
  //      if(businessIdeas.length > 0) {
  //        return NextResponse.redirect(new URL("/dashboard/ideas", process.env.NEXT_PUBLIC_APP_URL))
  //      }
  //    }
  // }


  const {
    data: { user },
  } = await supabase.auth.getUser()


  return supabaseResponse
}