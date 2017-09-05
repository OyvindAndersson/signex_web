<?php

namespace App\Http\Controllers;

use JavaScript;
use Auth;
use App\Project;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProject;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = \App\Order::all();
        JavaScript::put([
            'user' => Auth::user(),
            'projectsPostUrl' => route('projects.store'),
            'orders' => \App\Order::with('client')->get(),
            'clients' => \App\Client::all()
        ]);

        return view('project.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $orders = \App\Order::all();
        JavaScript::put([
            'user' => Auth::user(),
            'projectsPostUrl' => route('projects.store'),
            'orders' => \App\Order::with('client')->get(),
            'clients' => \App\Client::all()
        ]);

        return view('project.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProject $request)
    {
        $project = Project::create($request->all());
        if($project)
        {
            $code = \App\Project::get_code_from_id($project->id);
            $project->code = $code;
            $project->save();
        }
        if($request->ajax())
        {
            return response()->json(['project' => $project, 'order' => $project->order]);
        }

        return view('project.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        //
    }
}
