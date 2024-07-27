<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = new NewsCollection(News::paginate(5));
        $data = ([
            'title' => 'Portal Berita',
            'description' => 'Selamat Datang di portal berita lintas universe',
            'news' => $news
        ]);

        return Inertia::render('Homepage',$data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = array(
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'author' => Auth::user()->email,
        );

        $news = News::create($data);

        return redirect()->back()->with('message', 'Berita berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $news = News::where('author', Auth::user()->email)->latest()->get();
        $data = ([
            'allNews' => $news
        ]);

        return Inertia::render('Dashboard',$data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news,Request $request)
    {
        return Inertia::render('editNews',[
            'myNews' => $news::find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        $data = array(
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        );

        $news = News::where('id',$request->id)->update($data);

        return to_route('dashboard')->with('message', 'Berita berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, News $news)
    {
        News::where('id',$request->id)->delete();
    }
}
