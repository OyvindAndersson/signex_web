@extends('layouts.app')

@section('content')
<div id="projects-view-root">
    <!-- components/project/projects.view.jsx -->
</div>

<div>
    <h5>Project list debug</h5>
    <ul>
    @foreach(\App\Project::all() as $project)
        <li>{{$project}}</li>
    @endforeach
    </ul>
</div>
@endsection
