@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
<div id="project-create-view-root">
    <!-- components/project/create-order-project-view.view.jsx -->
</div>
        </div>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <h5>Project list debug</h5>
            <ul>
            @foreach(\App\Project::all() as $project)
                <li>{{$project}}</li>
            @endforeach
            </ul>
        </div>

        <div class="col-md-8 col-md-offset-2">
            <h5>Order list debug</h5>
            <ul>
            @foreach(\App\Order::with('client')->get() as $order)
                <li>{{$order}}</li>
            @endforeach
            </ul>
        </div>
    </div>
</div>
@endsection
